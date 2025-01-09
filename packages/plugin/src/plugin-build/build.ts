import fs from "fs-extra";
import path from "path";
import { InlineConfig, ResolvedConfig, build, mergeConfig } from "vite";
import { SSRConfig } from "../model";
import { finalUrl } from "../utils";

export const doBuildServer = async (
  ssrConfig: SSRConfig,
  viteConfig: ResolvedConfig
) => {
  const {
    root,
    serverMinify,
    serverOutDir,
    entryClient,
    clientOutDir,
    server,
    handler,
    serverBuild,
    rootDocument,
    entryRender,
    pageServer,
    pageBrowser,
    rootRoutes,
    errorBoundary,
    liveReload,
    viteScripts,
  } = ssrConfig;
  const serverFile = path.resolve(root, server);

  const { base = "/" } = viteConfig;
  let entryClientURL = finalUrl(base, entryClient);
  const manifestFile = path.resolve(`${clientOutDir}/manifest.json`);
  const manifestContent = fs.readFileSync(manifestFile, "utf-8");
  const manifest = JSON.parse(manifestContent);
  entryClientURL = finalUrl(base, manifest[entryClient].file);
  const ssrPublicDir = path.relative(serverOutDir, clientOutDir);

  const ssrFiles = [
    handler,
    rootDocument,
    entryClient,
    entryRender,
    pageServer,
    pageBrowser,
    rootRoutes,
    errorBoundary,
    liveReload,
    viteScripts,
  ];
  const baseConfig: InlineConfig = {
    appType: "custom",
    root,
    publicDir: "private",
    define: {
      "process.env.SSR_BASENAME": JSON.stringify(base),
      "process.env.SSR_PUBLIC_DIR": JSON.stringify(ssrPublicDir),
      "process.env.SSR_ENTRY_CLIENT": JSON.stringify(entryClientURL),
    },
    ssr: {
      noExternal: [],
    },
    build: {
      outDir: serverOutDir,
      ssr: serverFile,
      write: true,
      minify: serverMinify,
      target: "esnext",
      emptyOutDir: false,
      rollupOptions: {
        external: viteConfig.build?.rollupOptions?.external,
        output: {
          format: "es",
          entryFileNames: "app.js",
          chunkFileNames: "bin/[name]-[hash].js",
          assetFileNames: "assets/[name]-[hash].[ext]",
          manualChunks: (id) => {
            const isSsr = ssrFiles.find(
              (it) => id.startsWith(it) || id.endsWith(it)
            );
            if (isSsr) {
              return "ssr";
            }
            if (id.startsWith("virtual")) {
              return "virtual";
            }
          },
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
  const { root, clientMinify, clientOutDir, entryClient, clientBuild } =
    ssrConfig;
  const preloadFiles = [
    "modulepreload",
    "commonjsHelpers",
    "vite/",
    "installHook",
  ];
  const baseConfig: InlineConfig = {
    root,
    appType: "custom",
    define: {
      "process.env.SSR_BASENAME": JSON.stringify(base),
    },
    build: {
      write: true,
      manifest: true,
      minify: clientMinify,
      target: "modules",
      emptyOutDir: false,
      outDir: clientOutDir,
      rollupOptions: {
        external: viteConfig.build?.rollupOptions?.external,
        input: {
          main: path.resolve(root, entryClient),
        },
        output: {
          format: "es",
          entryFileNames: `assets/[name]-[hash].js`,
          chunkFileNames: `chunks/[name]-[hash].js`,
          assetFileNames: `assets/[name]-[hash].[ext]`,
          manualChunks: (id) => {
            const isInternal = preloadFiles.find((it) => id.includes(it));
            if (isInternal) {
              return "preload";
            }
            if (id.includes("node_modules")) {
              return "vendor";
            }
          },
        },
      },
    },
  };
  const customConfig = await clientBuild(baseConfig);
  const finalConfig = mergeConfig(baseConfig, customConfig);
  await build(finalConfig);
};
