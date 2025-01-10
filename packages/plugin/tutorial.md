# Create an SSR Application with Vite, React, React Query, React Bootstrap, and React Router

In this tutorial, we will create a server-side rendered (SSR) application using **Vite**, **React**, **React Query**, **React Bootstrap**, and **React Router**. We'll also configure the `vite-plugin-ssr-kit` plugin to handle SSR rendering.

## Prerequisites

Before starting, ensure you have:

- Node.js installed (version 20 or higher)
- Yarn package manager
- Basic knowledge of React and vite ecosystem

## 1. Create the Application

First, create a new Vite project with the React template:

```bash
yarn create vite my-ssr-app --template react
cd my-ssr-app
```

## 2. Install Required Libraries

Install the following dependencies:

```bash
yarn add react-router-dom@^6.28.0 react-bootstrap react-query vite-plugin-ssr-kit vite-plugin-pages
```

Let's understand what each package does:

- **react-router-dom@^6.28.0**: Handles routing in React applications. We use version 6.28.0 specifically because version 7.x requires Remix framework.

  - Provides components like `Route`, `Link`, and routing hooks
  - Enables client-side navigation
  - Manages URL parameters and query strings

- **react-bootstrap**: React components that implement Bootstrap's design system.

  - Provides pre-built, responsive UI components
  - Includes navigation, forms, cards, and other UI elements
  - No need to write Bootstrap classes manually

- **react-query**: Powerful data synchronization library for React.

  - Manages server state in React applications
  - Provides hooks for data fetching, caching, and updates
  - Handles loading and error states automatically

- **vite-plugin-ssr-kit**: Plugin that enables server-side rendering in Vite applications.

  - Handles SSR configuration and setup
  - Provides utilities for SSR lifecycle management
  - Manages client/server code splitting

- **vite-plugin-pages**: File system based routing plugin for Vite.
  - Creates routes based on file structure
  - Supports dynamic routes
  - Integrates with react-router-dom

## 3. Configure Project Structure

### 3.1 Move the Index File

Move the `/index.html` file to `/spa/index.html`. This separation allows us to maintain both SSR and SPA versions of the application:

```bash
mkdir spa
mv index.html spa/
```

> Note: The /spa/index.html file will serve as the entry point for the SPA version, while SSR will use a different entry point.

### 3.2 Create SSR Directory Structure

Create the necessary directories for SSR:

```bash
mkdir -p ssr/pages/posts/$1
```

## 4. Create the Root Document

Create `/ssr/root.jsx` to define the root document structure for server-side rendering:

```jsx
import { LiveReload } from "@ssr/liveReload.jsx";
import { ViteScripts } from "@ssr/viteScripts.jsx";
import { Container, Nav, Navbar } from "react-bootstrap";
import { QueryClient, QueryClientProvider } from "react-query";
import { Outlet } from "react-router-dom";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true, // Important: This ensures proper SSR behavior
    },
  },
});

export const RootDocument = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>Vite + React SSR</title>
          <link rel="icon" href="vite.svg" type="image/svg" />
          <LiveReload />
        </head>
        <body>
          <Container>
            <Navbar bg="light" expand="lg">
              <Navbar.Brand href="/">Vite SSR</Navbar.Brand>
              <Navbar.Toggle aria-controls="navbarNav" />
              <Navbar.Collapse id="navbarNav">
                <Nav className="me-auto">
                  <Nav.Link href="/">Home</Nav.Link>
                  <Nav.Link href="/posts">Posts</Nav.Link>
                  <Nav.Link href="/spa">SPA</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Container>
          <Outlet />
          <ViteScripts />
        </body>
      </html>
    </QueryClientProvider>
  );
};
```

> Important Note: Setting `suspense: true` in QueryClient configuration is crucial for maintaining the SSR appearance of the application. Without this setting, the client-side hydration process might cause flickering or inconsistencies between the server-rendered content and the client-side state.

## 5. Create Application Pages

### 5.1 Home Page

Create `/ssr/pages/index.jsx`:

```jsx
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <Container>
      <h1>Welcome to the Vite + React SSR App</h1>
      <Button as={Link} to="/posts">
        Go to Posts
      </Button>
    </Container>
  );
}
```

### 5.2 Posts List Page

Create `/ssr/pages/posts/index.jsx`:

```jsx
import { Card, Col, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

const getPosts = () =>
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((r) => r.json())
    .catch((e) => {
      throw e;
    });

export default function PostsPage() {
  const { data } = useQuery("posts", getPosts);
  return (
    <div>
      <Row>
        {data.map((post) => (
          <Col key={post.id} sm={12} md={6} lg={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.body}</Card.Text>
                <Card.Link as={Link} to={`/posts/${post.id}`}>
                  Read More
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
```

### 5.3 Single Post Page

Create `/ssr/pages/posts/$id/index.jsx`: (Note: Using $id for Remix-style routing)

```jsx
import { Card } from "react-bootstrap";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";

const getPost = (id) =>
  fetch("https://jsonplaceholder.typicode.com/posts/" + id)
    .then((r) => r.json())
    .catch((e) => {
      throw e;
    });

export default function PostPage() {
  const { id } = useParams();
  const { data } = useQuery(["posts", id], () => getPost(id));
  return (
    <Card>
      <Card.Header>{data.title}</Card.Header>
      <Card.Body>
        <Card.Text>{data.body}</Card.Text>
        <Card.Link as={Link} to="/posts">
          Back to Posts
        </Card.Link>
      </Card.Body>
    </Card>
  );
}
```

## 6. Configure Vite

Modify the existing `vite.config.js` file:

```javascript
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import pages from "vite-plugin-pages";
import ssr from "vite-plugin-ssr-kit";

export default defineConfig({
  base: "/myapp",
  plugins: [
    react(),
    pages({
      routeStyle: "remix", // Important: This enables Remix-style routing ($id instead of [id])
      dirs: "ssr/pages",
    }),
    ssr({
      rootDocument: "ssr/root.jsx",
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        spa: "spa/index.html", // Include the original React SPA entry point
      },
    },
  },
});
```

## 7. Development and Production

### 7.1 Development Server

Run the development server:

```bash
yarn dev
```

Access your application at:

- SSR version: `http://localhost:5173/myapp`
- SPA version: `http://localhost:5173/myapp/spa`

### 7.2 Production Build

Build the application:

```bash
yarn build
```

You should see output similar to this:

```bash
yarn run v1.22.22
$ vite build
vite v6.0.7 building for production...

CLIENT BUILD
vite v4.5.5 building for production...
✓ 396 modules transformed.
dist/client/spa/index.html                0.64 kB │ gzip:  0.35 kB
dist/client/manifest.json                 1.49 kB │ gzip:  0.38 kB
dist/client/assets/react-35ef61ed.svg     4.13 kB │ gzip:  2.05 kB
dist/client/assets/index-a36d8b68.css     1.39 kB │ gzip:  0.72 kB
dist/client/chunks/index-600303c7.js      0.46 kB │ gzip:  0.32 kB
dist/client/chunks/index-ef84de97.js      0.55 kB │ gzip:  0.37 kB
dist/client/assets/spa-dc418d3e.js        0.94 kB │ gzip:  0.50 kB
dist/client/chunks/preload-753c2a40.js    1.70 kB │ gzip:  0.89 kB
dist/client/assets/main-79767691.js       2.74 kB │ gzip:  1.16 kB
dist/client/chunks/vendor-d8646257.js   240.50 kB │ gzip: 75.98 kB
✓ built in 1.33s

SERVER BUILD
vite v4.5.5 building SSR bundle for production...
✓ 13 modules transformed.
dist/bin/index-066b4199.js    0.81 kB
dist/bin/index-b8b66606.js    0.92 kB
dist/bin/virtual-6df6f849.js  0.98 kB
dist/app.js                   1.22 kB
dist/bin/ssr-27500c0d.js      4.52 kB
✓ built in 52ms

✓ 31 modules transformed.
✓ built in 1.92s
Done in 2.43s.
```

The build will generate:

```
/dist/
  ├── app.js           # Application runtime
  ├── client/          # SSR public assets
  └── client/spa/      # SPA public assets
```

### 7.3 Sanbox Production Server Configuration

For production deployment, you can configure sanbox server settings using a private directory:

1. Create `/private/package.json` for server-specific dependencies

```json
{
  "name": "app",
  "private": true,
  "type": "module",
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-bootstrap": "^2.10.7",
    "react-dom": "^18.3.1",
    "react-query": "^3.39.3",
    "react-router-dom": "^6.28.0"
  }
}
```

2. Create `/private/.env` for server configuration:

```ini
SERVER_HOST=127.0.0.1
SERVER_PORT=4000
```

To start the production server:

```bash
cd dist
yarn start
```

or

```bash
cd dist
node app.js
```

> Note: The server will be running at: http://127.0.0.1:4000/myapp

## Additional Resources

- For a complete working example, visit the [GitHub repository](https://github.com/yracnet/vite-plugin-ssr-kit) and check the `packages/examples/my-ssr-app` directory.
- For more information about the SSR Kit plugin, refer to the [vite-plugin-ssr-kit documentation](https://github.com/yracnet/vite-plugin-ssr-kit/packages/plugin).

## Summary

This tutorial has shown you how to:

- Set up a Vite project with SSR capabilities
- Integrate React Query, React Bootstrap, and React Router
- Create both SSR and SPA versions of your application
- Configure development and production environments
- Handle server-side rendering of React components

The resulting application provides a solid foundation for building performant, server-rendered React applications while maintaining the option to serve a traditional SPA version when needed.
