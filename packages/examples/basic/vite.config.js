import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import web from "vite-plugin-web-routes";
//import ssr from "vite-plugin-ssr-config";
import ssr from "../../plugin/src";

// https://vite.dev/config/
export default defineConfig({
  //base: "/myapp",
  plugins: [
    react(),
    web({
      moduleFile: '.ssr/routes.tsx'
    }),
    ssr({
      rootDocument: "src/root.jsx",
    }),
  ],
});
