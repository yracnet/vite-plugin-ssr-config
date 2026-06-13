# vite-plugin-ssr-config

[vite-plugin-ssr-config](https://github.com/yracnet/vite-plugin-ssr-config) configures server-side rendering (SSR) with Vite, providing essential setups and options for building both client and server bundles, along with necessary React components for SSR, specifically for [React](https://reactjs.org/ "react - A JavaScript library for building user interfaces"), [React Router](https://reactrouter.com/ "react-router - Declarative routing for React"), [React Query](https://tanstack.com/query "@tanstack/react-query - Data fetching and caching library"), and [react-slotx](https://github.com/react-slotx/react-slotx "react-slotx - Slot-based content management for React SSR").

## Additional Resources

For more detailed information and resources related to `vite-plugin-ssr-config`, please refer to the following:

- **npm Package**: [vite-plugin-ssr-config](https://www.npmjs.com/package/vite-plugin-ssr-config)
- **GitHub Repository**: [yracnet/vite-plugin-ssr-config](https://github.com/yracnet/vite-plugin-ssr-config)
- **Dev.to Article**: [Create an SSR Application with Vite, React, React Query and React Router](https://dev.to/yracnet/create-an-ssr-application-with-vite-react-react-query-and-react-router-2dd5)
- **Tutorial**: [Tutorial](./tutorial.md)
- **react-slotx Documentation**: [react-slotx GitHub](https://github.com/react-slotx/react-slotx)

## Install

To add this plugin to your project, run the following commands:

```bash
yarn add vite-plugin-ssr-config vite-plugin-web-routes -D
```
```bash
yarn add @tanstack/react-query react-router express react-slotx
```

This will install:

- vite-plugin-ssr-config: The plugin for server-side rendering (SSR) with Vite.
- vite-plugin-web-routes: Automatically generate route files for your pages.
- @tanstack/react-query: Delegate Hydrated State
- react-router: The routing library for React, used to manage navigation within the app.
- react-slotx: Slot-based content management system for SSR, enabling dynamic head and SEO optimization.


## Basic Configuration Example

To use the plugin, you need to integrate it with Vite’s `defineConfig` method and add it to the plugins array. Here’s the basic configuration example for a React SSR project:

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import web from "vite-plugin-web-routes";
import ssr from "vite-plugin-ssr-config";

export default defineConfig({
  plugins: [
    react(),
    web({
      moduleId: 'ssr-pages'
    }),
    ssr({
      chacheDir: '.ssr'
    })
  ],
});
```

### Legacy project

If you use the vite-plugin-pages, you need config the moduleId

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import pages from "vite-plugin-pages";
import ssr from "vite-plugin-ssr-config";

export default defineConfig({
  plugins: [
    react(),
    pages({
      moduleId: "ssr-pages",
      routeStyle: "remix",
      dirs: "src/pages",
    }),
    ssr({
      chacheDir: '.ssr'
    })
  ],
});
```


## Default Configuration

The following default values are provided for each configurable attribute in the plugin:

```typescript
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
    })
```

> Important Note: PageServer uses `suspense: true` in all requests to ensure proper SSR rendering. On the other hand, PageBrowser uses `suspense: false` to allow smooth client-side navigation. This setup guarantees correct SSR rendering while preventing flickering and inconsistencies between the server-rendered content and the client-side state during hydration.

## Customization

You can customize the default values by providing your own configuration for the plugin in your `vite.config.js` file. For example, to change the entry point for your server-side app, you would set the `entryRender` value:

```typescript
ssr({
  entryRender: "src/server/entryRender.js",
});
```

This allows you to tailor the plugin to your project’s specific needs, including modifying file paths and directories for SSR output, live reload functionality, and more.

# Configuration Options

Here are all the configurable options available with `vite-plugin-ssr-config`:

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

# SEO with react-slotx

The plugin integrates [react-slotx](https://github.com/yracnet/react-slotx) for dynamic head content management. It lets any page component inject `<title>`, `<meta>`, and other head elements that are rendered server-side and kept reactive on the client.

## How it works

| Part | Import | Role |
|---|---|---|
| `Slot` | `react-slotx` | Register content into a named slot from any component |
| `Outlet` | `react-slotx` | Render slot content at a specific location in the tree |
| `SlotProvider` | `react-slotx` | Context provider — wraps the app (handled by the plugin) |
| `SlotClient` | `react-slotx` | Client-side slot store (handled by the plugin) |
| `SlotSSRClient` | `react-slotx/server` | Server-side slot store with `renderToString` (handled by the plugin) |

The plugin's default `root.jsx` already places an `<Outlet name="head" />` inside `<head>`. You only need to use `<Slot>` in your pages.

## Root document

```jsx
// ssr/root.jsx
import { LiveReload } from "@ssr/liveReload.jsx";
import { ViteScripts } from "@ssr/viteScripts.jsx";
import { Outlet as OutletSlot } from "react-slotx";
import { Outlet as OutletRoutes } from "react-router";

export const RootDocument = () => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <LiveReload />
        <OutletSlot name="head" />
      </head>
      <body>
        <OutletRoutes />
        <ViteScripts />
      </body>
    </html>
  );
};
```

## Page usage

```jsx
import { Slot } from "react-slotx";

export default function PostPage() {
  const { data = {} } = useQuery(...);
  return (
    <>
      <Slot name="head">
        <title>{data.title} — My App</title>
        <meta name="description" content={data.body} />
        <meta property="og:title" content={data.title} />
      </Slot>
      {/* page content */}
    </>
  );
}
```

The `<Slot name="head">` content is extracted server-side via `slotClient.renderToString("head")` and injected into the HTML stream before `</head>`. On the client it stays reactive through `<OutletSlot name="head" />`.

## Slot props

| Prop | Type | Default | Description |
|---|---|---|---|
| `name` | `string` | `"default"` | Slot name — must match the `name` on `<Outlet>` |
| `priority` | `number` | `1` | When multiple `<Slot>` share a name, the highest priority wins (in `"priority"` mode) |
| `dangerouslyEnableRender` | `boolean` | `false` | Also render children in-place (not just in the outlet) |

## Outlet props

| Prop | Type | Default | Description |
|---|---|---|---|
| `name` | `string \| "*"` | `"default"` | Which slot to render. `"*"` renders all slots |
| `mode` | `"priority" \| "first" \| "last" \| "all"` | `"priority"` | How to resolve multiple slots with the same name |
