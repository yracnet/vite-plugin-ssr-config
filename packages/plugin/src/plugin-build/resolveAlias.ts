import path from "path";
import { UserConfig } from "vite";
import { SSRConfig } from "../model.js";

export const createResolveAlias = (
  config: SSRConfig,
  viteConfig: UserConfig
) => {
  let {
    root,
    server,
    handler,
    rootDocument,
    entryClient,
    entryServer,
    pageServer,
    pageBrowser,
    rootRoutes,
    errorBoundary,
    liveReload,
    viteScripts,
  } = config;
  const assertFile = (name: string) => {
    return path.resolve(root, name);
  };
  return {
    "@ssr/server.js": assertFile(server),
    "@ssr/handler.js": assertFile(handler),
    "@ssr/root.jsx": assertFile(rootDocument),
    "@ssr/entryClient.jsx": assertFile(entryClient),
    "@ssr/entryServer.jsx": assertFile(entryServer),
    "@ssr/pageServer.jsx": assertFile(pageServer),
    "@ssr/pageBrowser.jsx": assertFile(pageBrowser),
    "@ssr/rootRoutes.jsx": assertFile(rootRoutes),
    "@ssr/errorBoundary.jsx": assertFile(errorBoundary),
    "@ssr/liveReload.jsx": assertFile(liveReload),
    "@ssr/viteScripts.jsx": assertFile(viteScripts),
  };
};
