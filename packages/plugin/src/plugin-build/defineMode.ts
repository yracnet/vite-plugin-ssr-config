import fs from "fs-extra";
import path from "path";
import { UserConfig } from "vite";
import { SSRConfig } from "../model.js";
import { finalUrl } from "../utils.js";

export const createDefineMode = (
  ssrConfig: SSRConfig,
  viteConfig: UserConfig
): Record<string, any> => {
  const { mode, outDir, entryClient, clientDir } = ssrConfig;
  const { base = "/" } = viteConfig;
  let entryClientURL = finalUrl(base, entryClient);
  const define: Record<string, any> = {
    "process.env.SSR_ENTRY_CLIENT": JSON.stringify(entryClientURL),
    "process.env.CSR_DIR": JSON.stringify(clientDir),
  };
  process.env.BUILD_TYPE = "";
  if (mode === "ssr:server") {
    process.env.BUILD_TYPE = "server";
    const manifestFile = path.resolve(
      `${outDir}/${clientDir}/.vite/manifest.json`
    );
    const manifestContent = fs.readFileSync(manifestFile, "utf-8");
    const manifest = JSON.parse(manifestContent);
    entryClientURL = finalUrl(base, manifest[entryClient].file);
    define["process.env.SSR_ENTRY_CLIENT"] = JSON.stringify(entryClientURL);
    define["process.env.MODE"] = '"production"';
    define["process.env.NODE_ENV"] = '"production"';
    define["import.meta.env.MODE"] = '"production"';
  } else if (mode === "ssr:client") {
    process.env.BUILD_TYPE = "client";
    define["process.env.MODE"] = '"production"';
    define["process.env.NODE_ENV"] = '"production"';
    define["import.meta.env.MODE"] = '"production"';
  }
  return define;
};
