import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import routePlugin from "vite-plugin-pages";
//import ssrKit from "vite-plugin-ssr-kit";
import ssrKit from "../../plugin/src";

// https://vite.dev/config/
export default defineConfig({
  ssr: {
    noExternal: ["styled-components"],
  },
  build: {
    minify: false,
    rollupOptions: {
      input: {
        main: "spa/index.html",
      },
    },
  },
  plugins: [
    react(),
    routePlugin({
      routeStyle: "remix",
      dirs: "src/pages",
    }),
    ssrKit({
      rootDocument: "src/root.jsx",
      // clientBuild: () => {
      //   return {
      //     build: {
      //       minify: false,
      //       rollupOptions: {
      //         output: {
      //           manualChunks: (id) => {
      //             if (id.includes("node_modules/")) {
      //               return "lib";
      //             } else if (id.includes("src/pages/")) {
      //               return "pages";
      //             }
      //           },
      //         },
      //       },
      //     },
      //   };
      // },
      // serverBuild: () => {
      //   return {
      //     build: {
      //       rollupOptions: {
      //         external: [],
      //       },
      //     },
      //   };
      // },
    }),
  ],
});
