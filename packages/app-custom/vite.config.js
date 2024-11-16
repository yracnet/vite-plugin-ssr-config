import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import routePlugin from "vite-plugin-pages";
import ssrPlugin from "../plugin/src/main";

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
    ssrPlugin({
      rootDocument: "src/root.jsx",
      clientConfig: () => {
        return {
          build: {
            rollupOptions: {
              output: {
                manualChunks: (id) => {
                  if (id.includes("node_modules/")) {
                    return "lib";
                  } else if (id.includes("src/pages/")) {
                    return "pages";
                  }
                },
              },
            },
          },
        };
      },
      serverConfig: () => {
        return {
          build: {
            rollupOptions: {
              external: ["react", "react-dom", "react-bootstrap"],
            },
          },
        };
      },
    }),
  ],
});
