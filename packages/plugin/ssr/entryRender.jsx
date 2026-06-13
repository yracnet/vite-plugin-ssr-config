import { dehydrate, QueryClient } from "@tanstack/react-query";
import { StrictMode } from "react";
import { renderToPipeableStream } from "react-dom/server";
import { Transform } from "stream";
import { PageServer } from "./pageServer.jsx";
import { SlotSSRClient } from "react-slotx/server";

const createRequestContext = () => {
  return {
    state: {},
    setHydratedState(partial) {
      this.state = {
        ...this.state,
        ...partial,
      };
    },
  };
};

const renderDefault = async (request, response, next) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        suspense: true,
      },
    },
  });
  const slotClient = new SlotSSRClient();
  const { pipe } = renderToPipeableStream(
    <StrictMode>
      <PageServer
        basename={process.env.SSR_BASENAME}
        location={request.originalUrl}
        queryClient={queryClient}
        slotClient={slotClient}
      />
    </StrictMode>,
    {
      bootstrapScripts: [],
      onShellReady: () => {
        // console.log(request.originalUrl, "onShellReady");
      },
      onAllReady: () => {
        // console.log(request.originalUrl, "onAllReady");
        let injected = false;
        const state = dehydrate(queryClient);
        const head = slotClient.renderToString("head");
        const stateScript = `<script>window.__HYDRATED_STATE__ = "${btoa(JSON.stringify(state))}";</script>`;
        const injectString = [" ", head, stateScript, " "]
          .filter(Boolean)
          .join("\n");
        const transform = new Transform({
          transform(chunk, encoding, callback) {
            if (!injected) {
              const str = chunk.toString();
              const idx = str.lastIndexOf("</head>");
              if (idx !== -1) {
                injected = true;
                const out = str.slice(0, idx) + injectString + str.slice(idx);
                callback(null, out);
                return;
              }
            }
            callback(null, chunk);
          },
        });
        try {
          response.setHeader("content-type", "text/html");
        } catch (error) {
          console.error("Set-Header Context-Type text/html Error:", error);
        }
        transform.pipe(response);
        pipe(transform);
      },
      onShellError: (error) => {
        // console.log(request.originalUrl, "onShellError", error);
      },
      onError: (error, errorInfo) => {
        // console.log(request.originalUrl, "onError", error, errorInfo);
        next(error);
      },
    },
  );
};

export const render = renderDefault;
