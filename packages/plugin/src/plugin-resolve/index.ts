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
  const absoluteFile = (name: string) => {
    return path.join(root, name);
  };
  return {
    name: "vite-plugin-ssr-kit:resolve",
    enforce: "pre",
    config: () => {
      return {
        resolve: {
          alias: {
            "@ssr/server.js": absoluteFile(server),
            "@ssr/handler.js": absoluteFile(handler),
            "@ssr/root.jsx": absoluteFile(rootDocument),
            "@ssr/entryClient.jsx": absoluteFile(entryClient),
            "@ssr/entryRender.jsx": absoluteFile(entryRender),
            "@ssr/pageServer.jsx": absoluteFile(pageServer),
            "@ssr/pageBrowser.jsx": absoluteFile(pageBrowser),
            "@ssr/rootRoutes.jsx": absoluteFile(rootRoutes),
            "@ssr/errorBoundary.jsx": absoluteFile(errorBoundary),
            "@ssr/liveReload.jsx": absoluteFile(liveReload),
            "@ssr/viteScripts.jsx": absoluteFile(viteScripts),
          },
        },
      };
    },
  };
};
