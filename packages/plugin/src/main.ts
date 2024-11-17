import { PluginOption } from "vite";
import { SSRUserConfig } from "./model.js";
import { pluginBuild } from "./plugin-build/index.js";
import { pluginServe } from "./plugin-serve/index.js";
import { pluginSkip } from "./plugin-skip/index.js";
import {
  assertSSRConfig,
  copySSRDirectory,
  getPluginDirectory,
} from "./utils.js";

export const ssrPlugin = (userConfig: SSRUserConfig = {}): PluginOption => {
  const ssrConfig = assertSSRConfig(userConfig);
  const dirname = getPluginDirectory();
  copySSRDirectory(dirname, ssrConfig.root);
  return [
    //Skip
    pluginSkip(),
    pluginBuild(ssrConfig),
    pluginServe(ssrConfig),
  ];
};

export const ssr = ssrPlugin;

export default ssrPlugin;
