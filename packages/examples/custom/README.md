# App Basic

## Installation

To set up and run the App Basic project, follow these steps:

1. Clone the repository:

   ```
   git clone <repository-url>
   ```

2. Install dependencies:
   ```
   yarn install
   ```

## Development

To start the development server with hot module reloading:

1. Run the following command:

   ```
   yarn dev
   ```

   This will start the Vite development server. You can access the app at `http://localhost:5173` (or the port specified in your Vite config).

## Compilation

To compile the app for production:

1. Run the following command:

   ```
   yarn build:ssr
   ```

   This will generate the production-ready build in the `dist` directory.

### Available Build Commands

- **`build:clean`** - Builds the app for SSR (Server-Side Rendering).
- **`build:client`** - Builds the client-side app only.
- **`build:server`** - Builds the server-side app only.

You can choose the appropriate command depending on your needs.

## package.json

```json
{
  "scripts": {
    "dev": "vite",
    "build:ssr": "vite build --mode ssr:clean && vite build --mode ssr:client && vite build --mode ssr:server",
    "build:clean": "vite build --mode ssr:clean",
    "build:client": "vite build --mode ssr:client",
    "build:server": "vite build --mode ssr:server"
  }
}
```
