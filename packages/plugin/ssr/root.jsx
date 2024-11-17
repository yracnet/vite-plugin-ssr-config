import { LiveReload } from "@ssr/liveReload.jsx";
import { ViteScripts } from "@ssr/viteScripts.jsx";
import { Outlet } from "react-router-dom";

export const RootDocument = () => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>ViteJS + React SSR</title>
        <link rel="icon" href="vite.svg" type="image/svg"></link>
        <LiveReload />
      </head>
      <body>
        <Outlet />
        <ViteScripts />
      </body>
    </html>
  );
};
