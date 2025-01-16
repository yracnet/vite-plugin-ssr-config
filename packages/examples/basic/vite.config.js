import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import pages from "vite-plugin-pages";
//import ssr from "vite-plugin-ssr-config";
import ssr from "../../plugin/src";

// https://vite.dev/config/
export default defineConfig({
  //base: "/myapp",
  plugins: [
    react(),
    pages({
      routeStyle: "remix",
      dirs: "src/pages",
    }),
    ssr({
      rootDocument: "src/root.jsx",
    }),
  ],
});
