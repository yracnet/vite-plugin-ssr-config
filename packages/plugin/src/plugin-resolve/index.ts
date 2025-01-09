import path from "path";
import { PluginOption } from "vite";
import { SSRConfig } from "../model.js";

export const pluginResolve = (ssrConfig: SSRConfig): PluginOption => {
  let {
    root,
    server,
    handler,
    rootDocument,
    entryClient,
    entryRender,
    pageServer,
    pageBrowser,
    rootRoutes,
    errorBoundary,
    liveReload,
    viteScripts,
  } = ssrConfig;
  const assertFile = (name: string) => {
    return path.join(root, name);
  };
  return {
    name: "vite-plugin-ssr-kit:resolve",
    enforce: "pre",
    config: () => {
      return {
        resolve: {
          alias: {
            "@ssr/server.js": assertFile(server),
            "@ssr/handler.js": assertFile(handler),
            "@ssr/root.jsx": assertFile(rootDocument),
            "@ssr/entryClient.jsx": assertFile(entryClient),
            "@ssr/entryRender.jsx": assertFile(entryRender),
            "@ssr/pageServer.jsx": assertFile(pageServer),
            "@ssr/pageBrowser.jsx": assertFile(pageBrowser),
            "@ssr/rootRoutes.jsx": assertFile(rootRoutes),
            "@ssr/errorBoundary.jsx": assertFile(errorBoundary),
            "@ssr/liveReload.jsx": assertFile(liveReload),
            "@ssr/viteScripts.jsx": assertFile(viteScripts),
          },
        },
      };
    },
  };
};
