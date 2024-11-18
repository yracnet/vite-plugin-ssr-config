import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { SSRConfig, SSRUserConfig } from "./model.js";

export const ENTRY_NONE = "_____.html";

export const finalUrl = (base: string, path: string) => {
  return `${base.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
};

export const getPluginDirectory = () => {
  if (typeof __dirname === "undefined") {
    const filename = fileURLToPath(import.meta.url);
    return path.dirname(filename);
  } else {
    return __dirname;
  }
};

export const copySSRDirectory = (origin: string, target: string) => {
  let ssrOrigin = path.resolve(origin, "../ssr");
  if (!fs.existsSync(ssrOrigin)) {
    ssrOrigin = path.resolve(origin, "../../ssr");
  }
  let ssrTarget = path.resolve(target, ".ssr");
  if (fs.existsSync(ssrTarget)) {
    fs.rmSync(ssrTarget, { recursive: true, force: true });
  }
  fs.copySync(ssrOrigin, ssrTarget, { overwrite: true });
};

export const assertSSRConfig = (ssrConfig: SSRUserConfig = {}): SSRConfig => {
  let {
    mode = "ssr:clean",
    root = process.cwd(),
    //React
    entryClient = ".ssr/entryClient.jsx",
    entryServer = ".ssr/entryServer.jsx",
    rootDocument = ".ssr/root.jsx",
    //Server
    server = ".ssr/server.js",
    handler = ".ssr/handler.js",
    //React SSR
    pageServer = ".ssr/pageServer.jsx",
    pageBrowser = ".ssr/pageBrowser.jsx",
    rootRoutes = ".ssr/rootRoutes.jsx",
    errorBoundary = ".ssr/errorBoundary.jsx",
    //Scripts
    liveReload = ".ssr/liveReload.jsx",
    viteScripts = ".ssr/viteScripts.jsx",
    //Out directories
    outDir = "dist",
    clientDir = "client",
    serverDir = "bin",
    assetDir = "assets",
    chunkDir = "chunks",
    clientConfig = (c) => c,
    serverConfig = (c) => c,
  } = ssrConfig;
  return {
    mode,
    root,

    entryClient,
    entryServer,
    rootDocument,
    server,
    handler,

    pageServer,
    pageBrowser,
    rootRoutes,
    errorBoundary,

    liveReload,
    viteScripts,

    outDir,
    clientDir,
    serverDir,
    assetDir,
    chunkDir,

    clientConfig,
    serverConfig,
  };
};
