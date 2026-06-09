import { PageServer } from "@ssr/pageServer.jsx";
import { StrictMode } from "react";
import { Transform } from "stream";
import { renderToPipeableStream } from "react-dom/server";

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
  const context = createRequestContext();
  const { pipe } = renderToPipeableStream(
    <StrictMode>
      <PageServer
        path={request.originalUrl}
        hydratedState={""} // Access is Not Allowed
        setHydratedState={context.setHydratedState.bind(context)}
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
        const transform = new Transform({
          transform(chunk, encoding, callback) {
            if (!injected) {
              const stateScript = `<script>window.__HYDRATED_STATE__ = "${btoa(JSON.stringify(context.state))}";</script>`;
              const str = chunk.toString();
              const idx = str.lastIndexOf("</head>");
              if (idx !== -1) {
                injected = true;
                const out = str.slice(0, idx) + stateScript + str.slice(idx);
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
