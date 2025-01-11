import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import pages from "vite-plugin-pages";
//import ssr from "vite-plugin-ssr-kit";
import ssr from "../../plugin/src";

export default defineConfig({
  base: "/myapp",
  plugins: [
    react(),
    pages({
      routeStyle: "remix", // Important: This enables Remix-style routing ($id instead of [id])
      dirs: "ssr/pages",
    }),
    ssr({
      rootDocument: "ssr/root.jsx",
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        spa: "spa/index.html", // Include the original React SPA entry point
      },
    },
  },
});
