import { PageServer } from "@ssr/pageServer.jsx";
import { StrictMode } from "react";
import { renderToPipeableStream } from "react-dom/server";

const renderDefault = async (request, response, next) => {
  let hydratedState = "";
  const setHydratedState = (state) => {
    state = JSON.stringify(state);
    hydratedState = btoa(state);
  };
  const { pipe } = renderToPipeableStream(
    <StrictMode>
      <PageServer
        path={request.originalUrl}
        hydratedState={""} // Access is Not Allowed
        setHydratedState={setHydratedState}
      />
    </StrictMode>,
    {
      bootstrapScripts: [],
      onShellReady: () => {
        // console.log(request.originalUrl, "onShellReady");
      },
      onAllReady: () => {
        // console.log(request.originalUrl, "onAllReady");
        response.setHeader("content-type", "text/html");
        pipe(response);
        response.write(
          `<script>window.__HYDRATED_STATE__ = "${hydratedState}";</script>`
        );
      },
      onShellError: (error) => {
        // console.log(request.originalUrl, "onShellError", error);
      },
      onError: (error, errorInfo) => {
        // console.log(request.originalUrl, "onError", error, errorInfo);
        next(error);
      },
    }
  );
};

export const render = renderDefault;
