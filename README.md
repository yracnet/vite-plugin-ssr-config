# vite-plugin-ssr-build

This project provides a Vite plugin to support server-side rendering (SSR) for React applications. It allows for efficient SSR bundling and client-side rendering (CSR) for modern web apps.

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

To install and use `vite-plugin-ssr-build`:

1. Clone the repository.
2. Run:

```
yarn add vite-plugin-ssr-build -D
```

3. Add the plugin to your Vite config:

```
import { defineConfig } from 'vite';
import react from "@vitejs/plugin-react";
import pages from "vite-plugin-pages";
import ssr from 'vite-plugin-ssr-build';

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
