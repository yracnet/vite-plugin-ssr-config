import { renderToPipeableStream } from "react-dom/server";
import { PageServer } from "@ssr/pageServer.jsx";
import { StrictMode } from "react";

const renderDefault = async (request, response, next) => {
  const { pipe } = renderToPipeableStream(
    <StrictMode>
      <PageServer path={request.url} />
    </StrictMode>,
    {
      bootstrapScripts: [],
      onShellReady: () => {
        // console.log(request.url, "onShellReady");
        response.setHeader("content-type", "text/html");
        pipe(response);
      },
      onAllReady: () => {
        // console.log(request.url, "onAllReady");
      },
      onShellError: (error) => {
        // console.log(request.url, "onShellError", error);
      },
      onError: (error, errorInfo) => {
        // console.log(request.url, "onError", error, errorInfo);
        next(error);
      },
    }
  );
};

export const render = renderDefault;
