import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import pages from "vite-plugin-pages";
//import ssrKit from "vite-plugin-ssr-kit";
import ssrKit from "../../plugin/src";

// https://vite.dev/config/
export default defineConfig({
  base: "/myapp",
  ssr: {
    noExternal: ["styled-components"],
  },
  build: {
    minify: false,
    rollupOptions: {
      input: {
        spa: "spa/index.html",
      },
    },
  },
  plugins: [
    react(),
    pages({
      routeStyle: "remix",
      dirs: "src/pages",
    }),
    ssrKit({
      rootDocument: "src/root.jsx",
      clientMinify: false,
      serverMinify: false,
      // clientBuild: () => {
      //   return {
      //     build: {
      //       rollupOptions: {
      //         output: {
      //           manualChunks: {
      //             //react: ["react", "react-dom"],
      //             //router: ["react-router", "react-router-dom"],
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
