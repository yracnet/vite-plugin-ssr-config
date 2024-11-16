import fs from "fs-extra";
import path from "path";
import { BuildOptions, UserConfig } from "vite";
import { SSRConfig } from "../model.js";

const onWarnServer = (warning: any, handler: any) => {
  if (
    warning.code === "UNUSED_EXTERNAL_IMPORT" &&
    warning.ids.some((id: string) => id.includes("node_modules"))
  ) {
    return;
  }
  handler(warning);
};

export const createBuildMode = (
  ssrConfig: SSRConfig,
  viteConfig: UserConfig
): BuildOptions => {
  const {
    mode,
    root,
    outDir,
    serverDir,
    entryClient,
    clientDir,
    assetDir,
    chunkDir,
    server,
  } = ssrConfig;
  if (mode === "ssr:clean") {
    const distDir = path.resolve(root, outDir);
    if (fs.existsSync(distDir)) {
      fs.rmSync(distDir, { recursive: true, force: true });
    }
  }
  if (mode === "ssr:client") {
    return {
      write: true,
      manifest: true,
      emptyOutDir: true,
      copyPublicDir: true,
      outDir: `${outDir}/${clientDir}`,
      rollupOptions: {
        input: {
          main: path.resolve(root, entryClient),
        },
        output: {
          entryFileNames: `${chunkDir}/[name]-[hash].js`,
          chunkFileNames: `${chunkDir}/[name]-[hash].js`,
          assetFileNames: `${assetDir}/[name]-[hash].[ext]`,
        },
      },
    };
  }
  if (mode === "ssr:server") {
    return {
      write: true,
      emptyOutDir: false,
      copyPublicDir: false,
      ssr: path.resolve(root, server),
      outDir: outDir,
      rollupOptions: {
        onwarn: onWarnServer,
        output: {
          chunkFileNames: `${serverDir}/[name]-[hash].js`,
          assetFileNames: `${assetDir}/[name]-[hash].[ext]`,
        },
      },
    };
  }
  return {};
};
