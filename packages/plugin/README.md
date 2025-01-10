# vite-plugin-ssr-kit

This plugin enables server-side rendering (SSR) with Vite, providing essential configurations and customization options for building both the client and server bundles, along with the necessary React components for SSR.

## Install

To add this plugin to your project, run the following commands:

```bash
yarn add vite-plugin-ssr-kit vite-plugin-pages react-router-dom -D
```

This will install:

- vite-plugin-ssr-kit: The plugin for server-side rendering (SSR) with Vite.
- vite-plugin-pages: Automatically generate route files for your pages.
- react-router-dom: The routing library for React, used to manage navigation within the app.

```bash
yarn add react-router-dom
```

## Basic Configuration Example

To use the plugin, you need to integrate it with Vite’s `defineConfig` method and add it to the plugins array. Here’s the basic configuration example for a React SSR project:

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import pages from "vite-plugin-pages";
import ssr from "vite-plugin-ssr-kit";

export default defineConfig({
  plugins: [react(), pages(), ssr()],
});
```

## Default Configuration

The following default values are provided for each configurable attribute in the plugin:

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import pages from "vite-plugin-pages";
import ssr from "vite-plugin-ssr-kit";

export default defineConfig({
  plugins: [
    react(),
    pages(),
    ssr({
      root: process.cwd(), // Root directory, typically the project root.

      // React-related files
      entryClient: ".ssr/entryClient.jsx", // Entry point for the client-side app.
      entryRender: ".ssr/entryRender.jsx", // Entry point for the server-side app.
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
      clientOutDir: "dist/client", // Client-side output directory.
      serverOutDir: "dist", // Server-side output directory.

      // Build options
      clientMinify: true, // Whether to minify the client-side code.
      serverMinify: false, // Whether to minify the server-side code.
      disableBuild: false, // Whether to disable the build process entirely.

      // Config callbacks
      clientBuild: (config: UserConfig) => config, // Client-side Vite configuration.
      serverBuild: (config: UserConfig) => config, // Server-side Vite configuration.
    }),
  ],
});
```

## Customization

You can customize the default values by providing your own configuration for the plugin in your `vite.config.js` file. For example, to change the entry point for your server-side app, you would set the `entryRender` value:

```typescript
ssr({
  entryRender: "src/server/entryRender.js",
});
```

This allows you to tailor the plugin to your project’s specific needs, including modifying file paths and directories for SSR output, live reload functionality, and more.

# Configuration Options

Here are all the configurable options available with `vite-plugin-ssr-kit`:

### `root` (string)

The root directory of your project. Defaults to the current working directory (`process.cwd()`).

### `entryClient` (string)

The entry point for the client-side application. Defaults to `.ssr/entryClient.jsx`.

### `entryRender` (string)

The entry point for the server-side application. Defaults to `.ssr/entryRender.jsx`.

### `rootDocument` (string)

The root document for React SSR. Defaults to `.ssr/root.jsx`.

### `server` (string)

The main server file. Defaults to `.ssr/server.js`.

### `handler` (string)

The request handler file for SSR. Defaults to `.ssr/handler.js`.

### `pageServer` (string)

The server-side page rendering file. Defaults to `.ssr/pageServer.jsx`.

### `pageBrowser` (string)

The browser-side page rendering file. Defaults to `.ssr/pageBrowser.jsx`.

### `rootRoutes` (string)

The root routes for SSR. Defaults to `.ssr/rootRoutes.jsx`.

### `errorBoundary` (string)

The error boundary for SSR rendering. Defaults to `.ssr/errorBoundary.jsx`.

### `liveReload` (string)

The script for live reloading. Defaults to `.ssr/liveReload.jsx`.

### `viteScripts` (string)

The Vite-related scripts file. Defaults to `.ssr/viteScripts.jsx`.

### `clientOutDir` (string)

The output directory for the client-side bundle. Defaults to `dist/client`.

### `serverOutDir` (string)

The output directory for the server-side bundle. Defaults to `dist`.

### `clientMinify` (boolean | "terser" | "esbuild")

Controls whether to minify the client-side code. Defaults to `true`.

### `serverMinify` (boolean | "terser" | "esbuild")

Controls whether to minify the server-side code. Defaults to `false`.

### `disableBuild` (boolean)

Whether to disable the build process entirely. Defaults to `false`.

### `clientBuild` (function)

A callback to customize the client-side Vite build configuration. Defaults to an identity function `(config) => config`.

### `serverBuild` (function)

A callback to customize the server-side Vite build configuration. Defaults to an identity function `(config) => config`.

# Execution and Compilation

The following commands are available in the `package.json` file to manage development, builds, and previewing your Vite project with SSR. These commands utilize custom build modes, providing flexibility in how the project is built for SSR (Server-Side Rendering) and client-side code.

## package.json

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

## Commands

### `dev`

Runs the Vite development server for the project in development mode.

```bash
npm run dev
```

This will start the Vite development server with hot module replacement (HMR), allowing you to preview your application in a local environment.

### `build`

Builds the application with server-side rendering and client-side rendering. This command runs two different build client and server-side bundles.

```bash
npm run build
```

It consists of:

1. **`clean`**: Cleans the existing build files.
2. **`client`**: Builds the client-side bundle.
3. **`server`**: Builds the server-side bundle.

This is typically used for SSR applications where both the server and client code need to be built separately.

## Summary

These custom commands are designed to provide flexibility in your Vite SSR workflow. Whether you need a full build with SSR or just client or server-side parts, these scripts allow you to run specific builds with ease.

## Use Case

This plugin is intended for projects that require SSR with Vite, specifically React apps. It helps in managing SSR entry files, routing, page rendering, and output structure for both server and client builds.
