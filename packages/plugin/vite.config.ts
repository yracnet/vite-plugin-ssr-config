import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { resolve } from "path";

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
        "@ssr",
      ],
    },
    lib: {
      entry: resolve("src/main.ts"),
      formats: ["es", "cjs"],
      fileName: (format) => {
        return `[name]-${format}.js`;
      },
    },
  },
  plugins: [
    dts({
      outDir: "dist/types",
      insertTypesEntry: true,
      include: ["plugin"],
    }),
  ],
});
