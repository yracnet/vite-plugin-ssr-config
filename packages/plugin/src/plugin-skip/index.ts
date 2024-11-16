import { PluginOption } from "vite";
import { ENTRY_NONE } from "../utils.js";

export const pluginSkip = (): PluginOption => {
  return {
    name: "ssr-plugin-skip",
    enforce: "pre",
    config: () => {
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
