import { mergeConfig, PluginOption, UserConfig } from "vite";
import { SSRConfig } from "../model.js";
import { createBuildMode } from "./buildMode.js";
import { createDefineMode } from "./defineMode.js";
import { createResolveAlias } from "./resolveAlias.js";

export const pluginBuild = (ssrConfig: SSRConfig): PluginOption => {
  const { serverConfig, clientConfig } = ssrConfig;
  return {
    name: "ssr-plugin-build",
    enforce: "pre",
    config: (viteConfig) => {
      //@ts-ignore
      ssrConfig.mode = viteConfig.mode;
      const alias = createResolveAlias(ssrConfig);
      const build = createBuildMode(ssrConfig);
      const define = createDefineMode(ssrConfig, viteConfig);
      let baseConfig: UserConfig = {
        appType: "custom",
        resolve: {
          alias,
        },
        define,
        build,
      };
      if (ssrConfig.mode === "ssr:client") {
        const nextConfig = clientConfig(baseConfig);
        baseConfig = mergeConfig(baseConfig, nextConfig);
      }
      if (ssrConfig.mode === "ssr:server") {
        const nextConfig = serverConfig(baseConfig);
        baseConfig = mergeConfig(baseConfig, nextConfig);
      }
      return baseConfig;
    },
  };
};
