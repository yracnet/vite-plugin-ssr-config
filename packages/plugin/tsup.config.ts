import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["src/index.ts"],
    format: ["cjs", "esm"],
    outDir: "dist",
    external: ["vite", "express", "fast-glob", "slash-path"],
    dts: true,
    clean: true,
    sourcemap: false,
    minify: false,
  },
  // {
  //   entry: [
  //     "src/ssr/entryClient.jsx",
  //     "src/ssr/entryRender.jsx",
  //     "src/ssr/errorBoundary.jsx",
  //     "src/ssr/handler.js",
  //     "src/ssr/liveReload.jsx",
  //     "src/ssr/pageBrowser.jsx",
  //     "src/ssr/pageServer.jsx",
  //     "src/ssr/root.jsx",
  //     "src/ssr/rootRoutes.jsx",
  //     "src/ssr/server.js",
  //     "src/ssr/viteScripts.jsx",
  //     "src/ssr/env.ts",
  //   ],
  //   format: ["esm"],
  //   outDir: ".ssr",
  //   external: [
  //     "vite",
  //     "express",
  //     "fast-glob",
  //     "slash-path",
  //     "@ssr/server",
  //     "@ssr/handler",
  //     "@ssr/routers",
  //   ],
  //   dts: true,
  //   clean: true,
  //   sourcemap: false,
  //   minify: false,
  //   target: "esnext",
  // },
]);
