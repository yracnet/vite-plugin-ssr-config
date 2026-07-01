import { LiveReload } from "./liveReload.jsx";
import { ViteScripts } from "./viteScripts.jsx";
import { Outlet as OutletSlot } from "react-slotx";
import { Outlet as OutletRoutes } from "react-router";

export const RootDocument = () => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <LiveReload />
        <OutletSlot name="head"/>
      </head>
      <body>
        <OutletRoutes />
        <ViteScripts />
      </body>
    </html>
  );
};
