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

export const findDirPlugin = (dirname: string, max = 5) => {
  const basedir = getPluginDirectory();
  let relative = "/";
  let dirPath = "";
  for (var i = 0; i < max; i++) {
    dirPath = path.join(basedir, relative, dirname);
    if (fs.existsSync(dirPath)) {
      return dirPath;
    }
    relative += "../";
  }
  throw Error(`Not found: ${dirPath}`);
};

export const cleanDirectory = (target: string) => {
  if (fs.existsSync(target)) {
    fs.rmSync(target, { recursive: true, force: true });
  }
  fs.mkdirSync(target, { recursive: true });
};

export const copyFilesDirectory = (
  origin: string,
  target: string,
  {
    files = [],
    oldId = "",
    newId = "",
  }: {
    files?: string[];
    oldId?: string;
    newId?: string;
  }
) => {
  files.forEach((file) => {
    const sourceFilePath = path.join(origin, file);
    const targetFilePath = path.join(target, file);
    if (oldId !== newId) {
      let fileContent = fs.readFileSync(sourceFilePath, "utf-8");
      fileContent = fileContent.replace(new RegExp(oldId, "g"), newId);
      fs.writeFileSync(targetFilePath, fileContent, "utf-8");
    } else {
      fs.copySync(sourceFilePath, targetFilePath, { overwrite: true });
    }
  });
};

export const assertSSRConfig = (ssrConfig: SSRUserConfig = {}): SSRConfig => {
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
  } = ssrConfig;
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
