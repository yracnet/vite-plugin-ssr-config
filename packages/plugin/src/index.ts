import path from "path";
import { PluginOption } from "vite";
import { assertSSRConfig, SSROpts } from "./model.js";
import { pluginBuild } from "./plugin-build/index.js";
import { pluginResolve } from "./plugin-resolve/index.js";
import { pluginServe } from "./plugin-serve/index.js";
import { cleanDirectory, copyFilesDirectory, findDirPlugin } from "./utils.js";

export const ssrConfig = (opts: SSROpts = {}): PluginOption => {
  const ssrConfig = assertSSRConfig(opts);
  const cacheOrigin = findDirPlugin("ssr");
  const cacheTarget = path.join(ssrConfig.root, ".ssr");
  cleanDirectory(cacheTarget);
  copyFilesDirectory(cacheOrigin, cacheTarget, {
    files: [
      "entryClient.jsx",
      "entryRender.jsx",
      "errorBoundary.jsx",
      "handler.js",
      "liveReload.jsx",
      "pageBrowser.jsx",
      "pageServer.jsx",
      "root.jsx",
      "rootRoutes.jsx",
      "server.js",
      "viteScripts.jsx",
    ],
  });
  return [
    pluginResolve(ssrConfig),
    pluginServe(ssrConfig),
    pluginBuild(ssrConfig),
  ];
};

export const ssr = ssrConfig;

export default ssrConfig;
