import { LiveReload } from "@ssr/liveReload.jsx";
import { ViteScripts } from "@ssr/viteScripts.jsx";
import { Outlet as OutletSlot } from "react-slotx";
import { Outlet } from "react-router";

export const RootDocument = () => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />        
        <link rel="icon" href="/vite.svg" type="image/svg"></link>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <LiveReload />
        <OutletSlot name="head"/>
      </head>
      <body>
        <Outlet />
        <ViteScripts />
      </body>
    </html>
  );
};
