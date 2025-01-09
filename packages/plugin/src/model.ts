import { UserConfig } from "vite";

export type SSRConfig = {
  root: string;

  entryClient: string;
  entryRender: string;

  server: string;
  handler: string;

  rootDocument: string;
  pageServer: string;
  pageBrowser: string;
  rootRoutes: string;
  errorBoundary: string;
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
    disableBuild = false,
    //Main Entry
    entryClient = ".ssr/entryClient.jsx",
    entryRender = ".ssr/entryRender.jsx",
    rootDocument = ".ssr/root.jsx",
    //Server
    server = ".ssr/server.js",
    handler = ".ssr/handler.js",
    //SSR
    pageServer = ".ssr/pageServer.jsx",
    pageBrowser = ".ssr/pageBrowser.jsx",
    rootRoutes = ".ssr/rootRoutes.jsx",
    errorBoundary = ".ssr/errorBoundary.jsx",
    //Scripts
    liveReload = ".ssr/liveReload.jsx",
    viteScripts = ".ssr/viteScripts.jsx",
    //Out directories
    serverOutDir = "dist/",
    serverMinify = false,
    serverBuild = (config) => config,
    clientOutDir = "dist/client",
    clientMinify = true,
    clientBuild = (config) => config,
  } = ssrOpts;
  return {
    root,
    disableBuild,

    entryClient,
    entryRender,
    rootDocument,

    server,
    handler,

    pageServer,
    pageBrowser,
    rootRoutes,
    errorBoundary,

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
