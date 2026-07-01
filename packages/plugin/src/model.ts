import type { UserConfig } from "vite";
import path from "path";

export type SSRConfig = {
  root: string;
  cacheDir: string;

  entryClientKey: string;
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

export type SSROpts = Omit<Partial<SSRConfig>, "entryClientKey">;

export const assertSSRConfig = (ssrOpts: SSROpts = {}): SSRConfig => {
  const {
    disableBuild = false,
    // Dirs
    root = process.cwd(),
    cacheDir = ".ssr",
    // Server Config
    serverOutDir = "dist/",
    serverMinify = false,
    serverBuild = (config) => config,
    // Client Config
    clientOutDir = "dist/public",
    clientMinify = true,
    clientBuild = (config) => config,
  } = ssrOpts;

  const resolve = (value: string | undefined, fallback: string) => {
    if (!value) {
      return path.resolve(cacheDir, fallback);
    }
    if (path.isAbsolute(value)) {
      return value;
    }
    return path.resolve(root, value);
  };

  const resolveKey = (value: string | undefined, fallback: string) => {
    if (!value) {
      return path.join(cacheDir, fallback).replace(/\\/g, "/");
    }
    if (path.isAbsolute(value)) {
      return path.relative(root, value).replace(/\\/g, "/");
    }
    return value.replace(/\\/g, "/");
  }

  return {
    root,
    cacheDir,

    disableBuild,

    entryClientKey: resolveKey(ssrOpts.entryClient, "entryClient.jsx"),
    entryClient: resolve(ssrOpts.entryClient, "entryClient.jsx"),
    entryRender: resolve(ssrOpts.entryRender, "entryRender.jsx"),
    rootDocument: resolve(ssrOpts.rootDocument, "root.jsx"),

    server: resolve(ssrOpts.server, "server.js"),
    handler: resolve(ssrOpts.handler, "handler.js"),

    appShell: resolve(ssrOpts.appShell, "appShell.jsx"),
    pageServer: resolve(ssrOpts.pageServer, "pageServer.jsx"),
    pageBrowser: resolve(ssrOpts.pageBrowser, "pageBrowser.jsx"),
    rootRoutes: resolve(ssrOpts.rootRoutes, "rootRoutes.jsx"),
    errorFallback: resolve(ssrOpts.errorFallback, "errorFallback.jsx"),

    liveReload: resolve(ssrOpts.liveReload, "liveReload.jsx"),
    viteScripts: resolve(ssrOpts.viteScripts, "viteScripts.jsx"),

    serverOutDir,
    serverMinify,
    serverBuild,

    clientOutDir,
    clientMinify,
    clientBuild,
  };
};
