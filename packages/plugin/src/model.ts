import type { UserConfig } from "vite";
import path from "path";
import type { CodeSplittingOptions } from "rolldown";

const DefaultCodeSplitting = (config: SSRConfig): CodeSplittingOptions => {
  const preloadFiles = [
    "modulepreload",
    "commonjsHelpers",
    "vite/",
    "installHook",
  ];
  const ssrGroup = [
    // SSR
    config.entryRender,
    config.handler,
  ];
  const pageGroup = [
    config.rootRoutes,
    config.root,
    config.liveReload,
    config.viteScripts,
    config.appShell,
    config.pageServer,
    config.pageBrowser,
  ];
  const ignoreGroup = [
    // Main Entries
    config.server,
    config.entryClient,
  ];
  return {
    groups: [
      {
        name(id) {
          if (ignoreGroup.some((it) => id === it)) {
            return null;
          }
          if (pageGroup.some((it) => id.includes(it))) {
            return "page";
          }
          if (ssrGroup.some((it) => id.includes(it))) {
            return "ssr";
          }
          if (preloadFiles.some((it) => id.includes(it))) {
            return "preload";
          }
          if (id.includes("node_modules")) {
            return "vendor";
          }
          return null;
        },
      },
    ],
  };
};

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
  clientCodeSplitting: (config: SSRConfig) => CodeSplittingOptions;

  serverOutDir: string;
  serverMinify: boolean | "terser" | "esbuild";
  serverBuild: (config: UserConfig) => UserConfig;
  serverCodeSplitting: (config: SSRConfig) => CodeSplittingOptions;

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
    serverCodeSplitting = DefaultCodeSplitting,
    // Client Config
    clientOutDir = "dist/public",
    clientMinify = true,
    clientBuild = (config) => config,
    clientCodeSplitting = DefaultCodeSplitting,
  } = ssrOpts;

  const resolve = (value: string | undefined, fallback: string) => {
    if (!value) {
      return path.resolve(cacheDir, fallback).replace(/\\/g, "/");
    }
    if (path.isAbsolute(value)) {
      return value.replace(/\\/g, "/");
    }
    return path.resolve(root, value).replace(/\\/g, "/");
  };

  const resolveKey = (value: string | undefined, fallback: string) => {
    if (!value) {
      return path.join(cacheDir, fallback).replace(/\\/g, "/");
    }
    if (path.isAbsolute(value)) {
      return path.relative(root, value).replace(/\\/g, "/");
    }
    return value.replace(/\\/g, "/");
  };

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
    serverCodeSplitting,

    clientOutDir,
    clientMinify,
    clientBuild,
    clientCodeSplitting,
  };
};
