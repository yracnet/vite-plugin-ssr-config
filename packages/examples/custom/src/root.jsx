import { LiveReload } from "@ssr/liveReload.jsx";
import { ViteScripts } from "@ssr/viteScripts.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { Outlet } from "react-router-dom";
import viteSvg from "../public/vite.svg";
import { Ledger } from "./atom/ledger";
import { StyledInline } from "./atom/styledInline";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});
export const RootDocument = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>SSR Example</title>
          <link rel="icon" href={viteSvg} type="image/svg"></link>
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
          <StyledInline />
        </body>
      </html>
    </QueryClientProvider>
  );
};
