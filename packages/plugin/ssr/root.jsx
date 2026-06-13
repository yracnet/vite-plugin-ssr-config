import { LiveReload } from "@ssr/liveReload.jsx";
import { ViteScripts } from "@ssr/viteScripts.jsx";
import { Outlet as OutletInsert } from "react-slotx";
import { Outlet as OutletRoutes } from "react-router";

export const RootDocument = () => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <LiveReload />
        <OutletInsert name="head"/>
      </head>
      <body>
        <OutletRoutes />
        <ViteScripts />
      </body>
    </html>
  );
};
