import { PageServer } from "@ssr/pageServer.jsx";
import { StrictMode } from "react";
import { renderToPipeableStream } from "react-dom/server";

const renderDefault = async (request, response, next) => {
  const { pipe } = renderToPipeableStream(
    <StrictMode>
      <PageServer path={request.originalUrl} />
    </StrictMode>,
    {
      bootstrapScripts: [],
      onShellReady: () => {
        // console.log(request.originalUrl, "onShellReady");
        response.setHeader("content-type", "text/html");
        pipe(response);
      },
      onAllReady: () => {
        // console.log(request.originalUrl, "onAllReady");
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
