import { LiveReload } from "@ssr/liveReload.jsx";
import { ViteScripts } from "@ssr/viteScripts.jsx";
import { useState } from "react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export const RootDocument = () => {
  const [time, setTime] = useState(0);
  useEffect(() => {
    const idInterval = setInterval(() => {
      setTime((t) => t + 1);
    }, 1000);
    return () => {
      clearInterval(idInterval);
    };
  }, []);
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>SSR Example</title>
        <link rel="icon" href="vite.svg" type="image/svg"></link>
        <LiveReload />
      </head>
      <body>
        <h1>VITE + SSR Example</h1>
        <h4>TIME:{time}</h4>
        <Outlet />
        <ViteScripts />
      </body>
    </html>
  );
};
