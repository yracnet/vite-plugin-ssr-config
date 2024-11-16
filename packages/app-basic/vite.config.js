import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import routePlugin from "vite-plugin-pages";
import ssrPlugin from "../plugin/src/main";

// https://vite.dev/config/
export default defineConfig({
  //base: "/myapp",
  plugins: [
    react(),
    routePlugin({
      routeStyle: "remix",
      dirs: "src/pages",
    }),
    ssrPlugin({
      rootDocument: "src/root.jsx",
      dependencies: [
        "express",
        "react",
        "react-dom",
        "react-query",
        "react-bootstrap",
        "react-router-dom",
      ],
    }),
  ],
});
