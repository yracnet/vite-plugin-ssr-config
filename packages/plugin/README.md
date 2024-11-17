# vite-plugin-ssr-build

This plugin enables server-side rendering (SSR) with Vite, providing essential configurations and customization options for building both the client and server bundles, along with the necessary React components for SSR.

## Install

To add this plugin to your project, run the following commands:

```
yarn add vite-plugin-ssr-build vite-plugin-pages react-router-dom -D
```

This will install:

- vite-plugin-ssr-build: The plugin for server-side rendering (SSR) with Vite.
- vite-plugin-pages: Automatically generate route files for your pages.
- react-router-dom: The routing library for React, used to manage navigation within the app.

```
yarn add react-router-dom
```

## Basic Configuration Example

To use the plugin, you need to integrate it with Vite’s `defineConfig` method and add it to the plugins array. Here’s the basic configuration example for a React SSR project:

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import pages from "vite-plugin-pages";
import ssr from "vite-plugin-ssr-build";

export default defineConfig({
  plugins: [react(), pages(), ssr()],
});
```

## Default Configuration

The following default values are provided for each configurable attribute in the plugin:

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import pages from "vite-plugin-pages";
import ssr from "vite-plugin-ssr-build";

export default defineConfig({
  plugins: [
    react(),
    pages(),
    ssr({
      root: process.cwd(), // Root directory, typically the project root.

      // React-related files
      entryClient: ".ssr/entryClient.jsx", // Entry point for the client-side app.
      entryServer: ".ssr/entryServer.jsx", // Entry point for the server-side app.
      rootDocument: ".ssr/root.jsx", // Root document for React SSR.

      // Server-side files
      server: ".ssr/server.js", // Main server file.
      handler: ".ssr/handler.js", // Request handler for SSR.

      // React SSR-specific files
      pageServer: ".ssr/pageServer.jsx", // Server-side page rendering.
      pageBrowser: ".ssr/pageBrowser.jsx", // Browser-side page rendering.
      rootRoutes: ".ssr/rootRoutes.jsx", // Root routes for SSR.
      errorBoundary: ".ssr/errorBoundary.jsx", // Error boundary for SSR rendering.

      // Scripts
      liveReload: ".ssr/liveReload.jsx", // Script for live reloading.
      viteScripts: ".ssr/viteScripts.jsx", // Vite-related scripts.

      // Output directories
      outDir: "dist", // Output directory for build.
      clientDir: "client", // Client-side output directory.
      serverDir: "bin", // Server-side output directory.
      assetDir: "assets", // Assets directory.
      chunkDir: "chunks", // Chunk files directory.

      // Config callbacks
      clientConfig: (config: UserConfig) => config, // Client-side Vite configuration.
      serverConfig: (config: UserConfig) => config, // Server-side Vite configuration.
    }),
  ],
});
```

## Customization

You can customize the default values by providing your own configuration for the plugin in your `vite.config.js` file. For example, to change the entry point for your server-side app, you would set the `entryServer` value:

```js
ssr({
  entryServer: "src/server/entryServer.js",
});
```

This allows you to tailor the plugin to your project’s specific needs, including modifying file paths and directories for SSR output, live reload functionality, and more.

# Execution and Compilation

The following commands are available in the `package.json` file to manage development, builds, and previewing your Vite project with SSR. These commands utilize custom build modes, providing flexibility in how the project is built for SSR (Server-Side Rendering) and client-side code.

## package.json

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "build:ssr": "vite build --mode ssr:clean && vite build --mode ssr:client && vite build --mode ssr:server",
    "build:clean": "vite build --mode ssr:clean",
    "build:client": "vite build --mode ssr:client",
    "build:server": "vite build --mode ssr:server",
    "preview": "vite preview"
  }
}
```

## Commands

### `dev`

Runs the Vite development server for the project in development mode.

```
npm run dev
```

This will start the Vite development server with hot module replacement (HMR), allowing you to preview your application in a local environment.

### `build:ssr`

Builds the application with server-side rendering. This command runs three different build modes sequentially to create the clean, client, and server-side bundles.

```
npm run build:ssr
```

It consists of:

1. **`ssr:clean`**: Cleans the existing build files.
2. **`ssr:client`**: Builds the client-side bundle.
3. **`ssr:server`**: Builds the server-side bundle.

This is typically used for SSR applications where both the server and client code need to be built separately.

### `build:clean`

Builds the application with only the `ssr:clean` mode, which clears the build output and prepares the environment for a fresh build.

```
npm run build:clean
```

This is useful when you want to clear out old build files before performing a new build process.

### `build:client`

Builds only the client-side bundle with the `ssr:client` mode. It focuses on creating the JavaScript and static assets for the client-side application.

```
npm run build:client
```

This command is used when you only need to build the client-side code and not the server-side parts of the application.

### `build:server`

Builds only the server-side bundle with the `ssr:server` mode. It compiles the necessary server files for SSR rendering.

```
npm run build:server
```

This command is specifically used to build the server-side code for server-side rendering (SSR), often used in serverless or SSR environments.

This command will run a local server to preview the application as it will appear in production, using the compiled build output.

## Summary

These custom commands are designed to provide flexibility in your Vite SSR workflow. Whether you need a full build with SSR or just client or server-side parts, these scripts allow you to run specific builds with ease.

## Use Case

This plugin is intended for projects that require SSR with Vite, specifically React apps. It helps in managing SSR entry files, routing, page rendering, and output structure for both server and client builds.
