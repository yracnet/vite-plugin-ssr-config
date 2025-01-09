import { PluginOption, ResolvedConfig } from "vite";
import { SSRConfig } from "../model";
import { cleanDirectory } from "../utils";
import { doBuildClient, doBuildServer } from "./build";

const pluginBuildSkip = (): PluginOption => {
  const ENTRY_NONE = "____.html";
  return {
    name: "vite-plugin-ssr-kit:skip",
    enforce: "pre",
    apply: "build",
    config: () => {
      if (process.env.IS_SSR_KIT_BUILD) return {};
      return {
        build: {
          emptyOutDir: true,
          copyPublicDir: false,
          write: false,
          rollupOptions: {
            input: {
              main: ENTRY_NONE,
            },
          },
        },
      };
    },
    resolveId: (id) => {
      if (id === ENTRY_NONE) {
        return id;
      }
      return null;
    },
    load: (id) => {
      if (id === ENTRY_NONE) {
        return "";
      }
      return null;
    },
  };
};

const pluginBuildSSR = (ssrConfig: SSRConfig): PluginOption => {
  //@ts-ignore
  let viteConfig: ResolvedConfig = {};
  return {
    name: "vite-plugin-ssr-kit:build",
    enforce: "pre",
    apply: "build",
    configResolved: (config) => {
      viteConfig = config;
    },
    buildStart: async () => {
      if (process.env.IS_SSR_KIT_BUILD) return;
      process.env.IS_SSR_KIT_BUILD = "true";
      cleanDirectory(ssrConfig.clientOutDir);
      cleanDirectory(ssrConfig.serverOutDir);
      viteConfig.logger.info("");
      viteConfig.logger.info("\x1b[1m\x1b[31mCLIENT BUILD\x1b[0m");
      await doBuildClient(ssrConfig, viteConfig);
      viteConfig.logger.info("");
      viteConfig.logger.info("\x1b[1m\x1b[31mSERVER BUILD\x1b[0m");
      await doBuildServer(ssrConfig, viteConfig);
      viteConfig.logger.info("");
    },
  };
};

export const pluginBuild = (ssrConfig: SSRConfig): PluginOption => {
  if (ssrConfig.disableBuild) {
    return null;
  }
  return [pluginBuildSkip(), pluginBuildSSR(ssrConfig)];
};
