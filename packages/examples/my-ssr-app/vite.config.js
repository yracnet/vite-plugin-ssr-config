import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import web from "vite-plugin-web-routes";
import ssr from "vite-plugin-ssr-config";

export default defineConfig({
  base: "/myapp",
  plugins: [
    react(),
    web({
      moduleId: "ssr-pages",
      dirs:[{
        dir:'ssr/pages',
        route:''
      }]
    }),
    ssr({
      rootDocument: './ssr/root.jsx'
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