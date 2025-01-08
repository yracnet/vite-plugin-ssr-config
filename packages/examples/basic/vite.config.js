import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import routePlugin from "vite-plugin-pages";
import ssrKit from "vite-plugin-ssr-kit";

// https://vite.dev/config/
export default defineConfig({
  //base: "/myapp",
  plugins: [
    react(),
    routePlugin({
      routeStyle: "remix",
      dirs: "src/pages",
    }),
    ssrKit({
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
