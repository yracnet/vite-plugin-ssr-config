import fs from "fs-extra";
import path from "path";
import { PluginOption } from "vite";
import { SSRUserConfig } from "./model.js";
import { pluginBuild } from "./plugin-build/index.js";
import { pluginServe } from "./plugin-serve/index.js";
import { pluginSkip } from "./plugin-skip/index.js";
import { assertSSRConfig } from "./utils.js";

const copySSRDirectory = (origin: string, target: string) => {
  let ssrOrigin = path.resolve(origin, "../ssr");
  let ssrTarget = path.resolve(target, ".ssr");
  if (fs.existsSync(ssrTarget)) {
    fs.rmSync(ssrTarget, { recursive: true, force: true });
  }
  fs.copySync(ssrOrigin, ssrTarget, { overwrite: true });
};

export const ssrPlugin = (userConfig: SSRUserConfig = {}): PluginOption => {
  const ssrConfig = assertSSRConfig(userConfig);
  copySSRDirectory(__dirname, ssrConfig.root);
  return [
    //Skip
    pluginSkip(),
    pluginBuild(ssrConfig),
    pluginServe(ssrConfig),
  ];
};

export default ssrPlugin;
