import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import web from "vite-plugin-web-routes";
//import ssr from "vite-plugin-ssr-config";
import ssr from "../../plugin/src";

// https://vite.dev/config/
export default defineConfig({
  //base: "/myapp",
  server: {
    port: 3000,
    allowedHosts: [
      "ba46-166-114-134-183.ngrok-free.app"
    ]
  },
  plugins: [
    react(),
    web({
      moduleId: "ssr-pages",
    }),
    ssr({
      cacheDir: "cache-ssr",
      rootDocument: "src/root.jsx",
      clientMinify: "esbuild",
      serverMinify: "esbuild",
    }),
  ],
});
