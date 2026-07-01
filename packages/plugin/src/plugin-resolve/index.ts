import path from "path";
import type { PluginOption } from "vite";
import type { SSRConfig } from "../model";

export const pluginResolve = (ssrConfig: SSRConfig): PluginOption => {
  let {
    root,
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
  const absoluteFile = (name: string) => {
    return path.join(root, name);
  };
  return {
    name: "vite-plugin-ssr-config:resolve",
    enforce: "pre",
    config: () => {
      return {
        resolve: {
          alias: {
            "@ssr/server.js": absoluteFile(server),
            "@ssr/handler.js": absoluteFile(handler),
            "@ssr/root.jsx": absoluteFile(rootDocument),
            "@ssr/entryClient.jsx": absoluteFile(entryClient),
            "@ssr/appShell.jsx": absoluteFile(appShell),
            "@ssr/entryRender.jsx": absoluteFile(entryRender),
            "@ssr/pageServer.jsx": absoluteFile(pageServer),
            "@ssr/pageBrowser.jsx": absoluteFile(pageBrowser),
            "@ssr/rootRoutes.jsx": absoluteFile(rootRoutes),
            "@ssr/errorFallback.jsx": absoluteFile(errorFallback),
            "@ssr/liveReload.jsx": absoluteFile(liveReload),
            "@ssr/viteScripts.jsx": absoluteFile(viteScripts),
          },
        },
      };
    },
  };
};
