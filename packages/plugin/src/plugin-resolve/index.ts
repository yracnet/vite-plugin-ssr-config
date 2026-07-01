import type { PluginOption } from "vite";
import type { SSRConfig } from "../model";

export const pluginResolve = (ssrConfig: SSRConfig): PluginOption => {
  let {
    server,
    handler,
    rootDocument,
    appShell,
    entryClient,
    entryRender,
    pageServer,
    pageBrowser,
    rootRoutes,
    errorFallback,
    liveReload,
    viteScripts,
  } = ssrConfig;
  return {
    name: "vite-plugin-ssr-config:resolve",
    enforce: "pre",
    config: () => {
      return {
        resolve: {
          alias: {
            "@ssr/server.js": server,
            "@ssr/handler.js": handler,
            "@ssr/root.jsx": rootDocument,
            "@ssr/entryClient.jsx": entryClient,
            "@ssr/appShell.jsx": appShell,
            "@ssr/entryRender.jsx": entryRender,
            "@ssr/pageServer.jsx": pageServer,
            "@ssr/pageBrowser.jsx": pageBrowser,
            "@ssr/rootRoutes.jsx": rootRoutes,
            "@ssr/errorFallback.jsx": errorFallback,
            "@ssr/liveReload.jsx": liveReload,
            "@ssr/viteScripts.jsx": viteScripts,
          },
        },
      };
    },
  };
};
