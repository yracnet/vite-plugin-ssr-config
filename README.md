# vite-plugin-ssr-config

This project provides a Vite plugin to support server-side rendering (SSR) for React applications. It allows for efficient SSR bundling and client-side rendering (CSR) for modern web apps.

```vite ssr``` ```Vite plugin for SSR``` ```SSR + Vite``` ```SSR First``` ```Vite Plugin Ssr Examples and Templates``` ```Server-Side Rendering``` ```vite-plugin-ssr config```

## Framework-Agnostic

While the plugin is designed to be framework-agnostic, it comes preconfigured for **React** and is optimized for use with **react-router-dom**. The configuration can be easily modified to suit other routing libraries or use cases, should you wish to switch frameworks or libraries.

## React Query Support

With built-in **React Query** support, you no longer need to manually define API endpoints in your server-side code. This feature simplifies server-side data fetching and eliminates the need for complex API configurations. You can rely on React Query to fetch and manage data on the client side, and let SSR handle the rendering seamlessly.

## Key Features

- SSR support with Vite
- Configured for React and react-router-dom
- Integrated support for React Query, simplifying data fetching on both the server and client
- Easy configuration for other use cases or frameworks

## Overview

- **SSR Support**: Integrates SSR into Vite for React applications, enabling server-side rendering and client-side hydration.
- **CSR Support**: Integrates CSR into Vite for React applications, enabling multi-page in client-side
- **Customization**: Allows customization of the SSR server and client-side behavior.

## Project Structure

This repository includes the following packages:

1. **`plugin`**: The core SSR plugin for Vite.
2. **`app-basic`**: A basic SSR React app example.
3. **`app-custom`**: A more advanced configuration with custom setup.

For detailed usage, refer to each package's README.

## Installation

To install and use `vite-plugin-ssr-config`:

1. Clone the repository.
2. Run:

```
yarn add vite-plugin-ssr-config -D
```

3. Add the plugin to your Vite config:

```
import { defineConfig } from 'vite';
import react from "@vitejs/plugin-react";
import pages from "vite-plugin-pages";
import ssr from 'vite-plugin-ssr-config';

export default defineConfig({
  plugins: [
    react(),
    pages({
      routeStyle: "remix",
      dirs: "src/pages",
    }),
    ssr(),
  ],
});
```

## Documentation

- For detailed configuration, see the [plugin README](./packages/plugin/README.md).
- For the basic app example, refer to [app-basic README](./packages/app-basic/README.md).
- For the custom app setup, refer to [app-custom README](./packages/app-custom/README.md).

## APP Basic

This app utilizes the following libraries:

- **vite-plugin-pages**: A plugin that automatically generates routing based on the file structure.
- **react-router-dom**: A declarative routing library for React that enables navigation.
- **react-bootstrap**: A set of React components built on top of Bootstrap to build responsive web UIs.

## APP Custom

This app utilizes the following libraries:

- **vite-plugin-pages**: A plugin for generating routes based on your file structure.
- **react-router-dom**: A React library for handling routing and navigation.
- **react-bootstrap**: Bootstrap components adapted for React.
- **react-query**: A powerful library for data fetching, caching, and synchronization in React.
- **styled-components**: A library for writing CSS in JavaScript to style React components.
