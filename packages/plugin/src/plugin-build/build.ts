import path from "path";
import { type InlineConfig, type ResolvedConfig, build, mergeConfig } from "vite";
import type { SSRConfig } from "../model";
import { readManifest } from "../utils";
import { parseManifest } from "./parse";

export const doBuildServer = async (
  ssrConfig: SSRConfig,
  viteConfig: ResolvedConfig
) => {
  const {
    root,
    serverMinify,
    serverOutDir,
    entryClientKey,
    clientOutDir,
    server,
    serverBuild,
    serverCodeSplitting,
  } = ssrConfig;
  const { base = "/" } = viteConfig;

  const ssrServerFile = path.resolve(root, server);
  const ssrPublicDir = path.relative(serverOutDir, clientOutDir);
  const manifest = readManifest(clientOutDir);
  const ssrEntry = parseManifest(manifest, entryClientKey, base);
  const codeSplitting = serverCodeSplitting(ssrConfig);
  const baseConfig: InlineConfig = {
    appType: "custom",
    base,
    root,
    publicDir: "private",
    define: {
      "process.env.SSR_BASENAME": JSON.stringify(base),
      "process.env.SSR_PUBLIC_DIR": JSON.stringify(ssrPublicDir),
      "process.env.SSR_ENTRY": JSON.stringify(ssrEntry),
      "process.env.SSR": JSON.stringify(true),
    },
    ssr: {
      noExternal: [],
    },
    build: {
      outDir: serverOutDir,
      ssr: ssrServerFile,
      write: true,
      minify: serverMinify,
      target: "esnext",
      emptyOutDir: false,
      rolldownOptions: {
        external: viteConfig.build?.rolldownOptions?.external,
        output: {
          format: "es",
          entryFileNames: "app.js",
          chunkFileNames: "bin/[name]-[hash].js",
          assetFileNames: "assets/[name]-[hash].[ext]",
          codeSplitting,
        },
        onwarn: (warning: any, handler: any) => {
          if (
            warning.code === "UNUSED_EXTERNAL_IMPORT" &&
            warning.ids.some((id: string) => id.includes("node_modules"))
          ) {
            return;
          }
          handler(warning);
        },
      },
    },
  };
  const customConfig = await serverBuild(baseConfig);
  const finalConfig = mergeConfig(baseConfig, customConfig);
  await build(finalConfig);
};

export const doBuildClient = async (
  ssrConfig: SSRConfig,
  viteConfig: ResolvedConfig
) => {
  const { base = "/" } = viteConfig;
  const { root, clientMinify, clientOutDir, entryClient, clientBuild, clientCodeSplitting } =
    ssrConfig;
  const codeSplitting = clientCodeSplitting(ssrConfig);
  const baseConfig: InlineConfig = {
    root,
    appType: "custom",
    base,
    define: {
      "process.env.SSR_BASENAME": JSON.stringify(base),
      "process.env.SSR": JSON.stringify(false),
    },
    build: {
      write: true,
      manifest: true,
      minify: clientMinify,
      emptyOutDir: false,
      outDir: clientOutDir,
      rolldownOptions: {
        external: viteConfig.build?.rolldownOptions?.external,
        input: {
          main: path.resolve(root, entryClient),
        },
        output: {
          format: "es",
          entryFileNames: `assets/[name]-[hash].js`,
          chunkFileNames: `chunks/[name]-[hash].js`,
          assetFileNames: `assets/[name]-[hash].[ext]`,
          codeSplitting,
        },
      },
    },
  };
  const customConfig = await clientBuild(baseConfig);
  const finalConfig = mergeConfig(baseConfig, customConfig);
  await build(finalConfig);
};
