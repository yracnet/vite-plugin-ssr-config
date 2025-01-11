import { PageServer } from "@ssr/pageServer.jsx";
import { StrictMode } from "react";
import { renderToPipeableStream } from "react-dom/server";

const renderDefault = async (request, response, next) => {
  let state = "";
  const setState = (data) => {
    state = data;
  };
  const { pipe } = renderToPipeableStream(
    <StrictMode>
      <PageServer
        path={request.originalUrl}
        state={state}
        setState={setState}
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
          `<script>window.__STATE__ = ${JSON.stringify(state)};</script>`
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
