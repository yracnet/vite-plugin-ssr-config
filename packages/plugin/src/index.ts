import path from "path";
import { PluginOption } from "vite";
import { SSRUserConfig } from "./model.js";
import { pluginBuild } from "./plugin-build/index.js";
import { pluginResolve } from "./plugin-resolve/index.js";
import { pluginServe } from "./plugin-serve/index.js";
import {
  assertSSRConfig,
  cleanDirectory,
  copyFilesDirectory,
  findDirPlugin,
} from "./utils.js";

export const ssrKit = (userConfig: SSRUserConfig = {}): PluginOption => {
  const ssrConfig = assertSSRConfig(userConfig);
  const ssrOrigin = findDirPlugin("ssr");
  const ssrTarget = path.join(ssrConfig.root, ".ssr");
  cleanDirectory(ssrTarget);
  copyFilesDirectory(ssrOrigin, ssrTarget, {
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

export const ssr = ssrKit;

export default ssrKit;
