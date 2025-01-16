import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import pages from "vite-plugin-pages";
//import ssr from "vite-plugin-ssr-config";
import ssr from "../../plugin/src";

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
    ssr({
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
