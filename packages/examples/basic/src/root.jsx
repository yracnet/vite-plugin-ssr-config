import { LiveReload } from "@ssr/liveReload.jsx";
import { ViteScripts } from "@ssr/viteScripts.jsx";
import { Outlet } from "react-router-dom";
import { Ledger } from "./atom/ledger";

export const RootDocument = () => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>SSR Example</title>
        <link rel="icon" href="vite.svg" type="image/svg"></link>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <LiveReload />
      </head>
      <body>
        <Ledger />
        <Outlet />
        <ViteScripts />
      </body>
    </html>
  );
};
