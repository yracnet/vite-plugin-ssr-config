import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

//https://dev.to/receter/how-to-create-a-react-component-library-using-vites-library-mode-4lma
export default defineConfig({
  build: {
    minify: false,
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "vite",
        "path",
        "fs-extra",
        "fs",
        "url",
        "@ssr",
      ],
    },
    lib: {
      entry: resolve("src/main.ts"),
      formats: ["es", "cjs"],
      fileName: () => "[format]/[name].js",
    },
  },
  plugins: [
    dts({
      outDir: "dist/ts",
      insertTypesEntry: true,
      include: [],
    }),
  ],
});
