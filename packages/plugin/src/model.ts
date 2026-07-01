import type { UserConfig } from "vite";

export type SSRConfig = {
  root: string;
  version: "1.0" | "1.1";

  entryClient: string;
  entryRender: string;

  server: string;
  handler: string;

  rootDocument: string;
  appShell: string;
  pageServer: string;
  pageBrowser: string;
  rootRoutes: string;
  errorFallback: string;
  liveReload: string;
  viteScripts: string;

  clientOutDir: string;
  clientMinify: boolean | "terser" | "esbuild";
  clientBuild: (config: UserConfig) => UserConfig;

  serverOutDir: string;
  serverMinify: boolean | "terser" | "esbuild";
  serverBuild: (config: UserConfig) => UserConfig;

  disableBuild: boolean;
};

export type SSROpts = Partial<SSRConfig>;

export const assertSSRConfig = (ssrOpts: SSROpts = {}): SSRConfig => {
  let {
    root = process.cwd(),
    version = "1.1",
    disableBuild = false,
    //Main Entry
    entryClient = ".ssr/entryClient.jsx",
    entryRender = ".ssr/entryRender.jsx",
    rootDocument = ".ssr/root.jsx",
    //Server
    server = ".ssr/server.js",
    handler = ".ssr/handler.js",
    //SSR
    appShell = ".ssr/appShell.jsx",
    pageServer = ".ssr/pageServer.jsx",
    pageBrowser = ".ssr/pageBrowser.jsx",
    rootRoutes = ".ssr/rootRoutes.jsx",
    errorFallback = ".ssr/errorFallback.jsx",
    //Scripts
    liveReload = ".ssr/liveReload.jsx",
    viteScripts = ".ssr/viteScripts.jsx",
    //Out directories
    serverOutDir = "dist/",
    serverMinify = false,
    serverBuild = (config) => config,
    clientOutDir = "dist/public",
    clientMinify = true,
    clientBuild = (config) => config,
  } = ssrOpts;
  return {
    root,
    version,
    disableBuild,

    entryClient,
    entryRender,
    rootDocument,

    server,
    handler,
    
    appShell,
    pageServer,
    pageBrowser,
    rootRoutes,
    errorFallback,

    liveReload,
    viteScripts,

    serverOutDir,
    serverMinify,
    serverBuild,

    clientOutDir,
    clientMinify,
    clientBuild,
  };
};
