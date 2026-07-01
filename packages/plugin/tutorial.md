# Create an SSR Application with Vite, React, React Query and React Router

In this tutorial, we will create a server-side rendered (SSR) application using **Vite**, **React**, **React Query**, **React Bootstrap**, and **React Router**. We'll also configure the `vite-plugin-ssr-config` plugin to handle SSR rendering.

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
yarn add react-router react-bootstrap @tanstack/react-query react-slotx express
yarn add -D vite-plugin-ssr-config vite-plugin-web-routes
```

Let's understand what each package does:

- **react-router-dom**: Handles routing in React applications.

  - Provides components like `Route`, `Link`, and routing hooks
  - Enables client-side navigation
  - Manages URL parameters and query strings

- **react-bootstrap**: React components that implement Bootstrap's design system.

  - Provides pre-built, responsive UI components
  - Includes navigation, forms, cards, and other UI elements
  - No need to write Bootstrap classes manually

- **@tanstack/react-query**: Powerful data synchronization library for React.

  - Manages server state in React applications
  - Provides hooks for data fetching, caching, and updates
  - Handles loading and error states automatically

- **react-error-boundary**: Error Fallback for handling errors in SSR rendering.

  - Provides ErrorBoundary component to catch rendering errors
  - Supports custom fallback UI via fallbackRender prop
  - Integrates with the SSR error fallback system
  - Enables retry functionality for error recovery

- **react-slotx**: Slot-based content management system for SSR and SEO.

  - Manages dynamic content injection through slots
  - Enables dynamic head management (meta tags, OG tags, etc.)
  - Integrates seamlessly with server-side rendering
  - Supports client-side slot providers for flexible content placement

- **vite-plugin-ssr-config**: Plugin that enables server-side rendering in Vite applications.

  - Handles SSR configuration
  - Manages client/server code splitting

- **vite-plugin-web-routes**: File system based routing plugin for Vite.
  - Creates routes based on file structure
  - Supports dynamic routes
  - Integrates with react-router-dom

- **express**: Server.

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
mkdir -p ssr/pages/posts/[id]
```

## 4. Create Application Pages

### 4.1 Layout Page

Create `/ssr/pages/LAYOUT.jsx`:

```jsx
import { Slot } from "react-slotx";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link, Outlet } from "react-router";

export default function Layout() {
  return (
    <>
      <Slot name="head">
        <title>Vite SSR App Template</title>
      </Slot>
      <Container>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/myapp/">Vite SSR</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav">
            <Nav className="me-auto">
              <Nav.Link to="/" as={Link}>
                Home
              </Nav.Link>
              <Nav.Link to="/posts" as={Link}>
                Posts
              </Nav.Link>
              <Nav.Link href="/myapp/spa">Vite SPA Entry</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
      <Container>
        <Outlet />
      </Container>
    </>
  );
}
```

### 4.2 Home Page

Create `/ssr/pages/PAGE.jsx`:

```jsx
import { Slot } from "react-slotx";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router";

export default function HomePage() {
  return (
    <Container>
      <h1>Welcome to the Vite + React SSR App</h1>
      <Button as={Link} to="/posts">
        Go to Posts
      </Button>
      <Slot name="head">
        <title>Home — Vite SSR App</title>
        <meta name="description" content="Welcome to the Vite + React SSR App" />
      </Slot>
    </Container>
  );
}
```

### 4.3 Posts List Page

Create `/ssr/pages/posts/PAGE.jsx`:

```jsx
import { Slot } from "react-slotx";
import { Card, Col, Row } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

const getPosts = () =>
  fetch("https://jsonplaceholder.typicode.com/posts").then((r) => r.json());

export default function PostsPage() {
  const { data = [] } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });
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
      <Slot name="head" priority={2}>
        {/* title support only string */}
        <title>{`Post List ${data.length} Rows`}</title>
      </Slot>
    </div>
  );
}
```

### 4.4 Single Post Page

Create `/ssr/pages/posts/[id]/PAGE.jsx`:

```jsx
import { Slot } from "react-slotx";
import { Card } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";

const getPost = (id) =>
  fetch("https://jsonplaceholder.typicode.com/posts/" + id).then((r) =>
    r.json(),
  );

export default function PostPage() {
  const { id } = useParams();
  const { data = [] } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPost(id),
  });
  return (
    <Card>
      <Slot name="head" priority={2}>
        {/* title support only string */}
        <title>{`Post #${id}: ${data.title}`}</title>
        <meta name="description" content={data.body} />
        <meta property="og:title" content={data.title} />
      </Slot>
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
## 4.5 Create the Root Document

Create `/ssr/root.jsx` to define the root document structure for server-side rendering:

```jsx
import { LiveReload } from "@ssr/liveReload.jsx";
import { ViteScripts } from "@ssr/viteScripts.jsx";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Outlet as OutletSlot } from "react-slotx";
import { Link, Outlet as OutletRoutes } from "react-router";

export const RootDocument = () => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="vite.svg" type="image/svg" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <LiveReload />
        <OutletSlot name="head" />
        {/** see .ssr/entryRender.jsx for check was inject slot in SSR */}
      </head>
      <body>
        <OutletRoutes />
        <ViteScripts />
      </body>
    </html>
  );
};
```

## 5. Configure Vite

Modify the existing `vite.config.js` file:

```javascript
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import web from "vite-plugin-web-routes";
import ssr from "vite-plugin-ssr-config";

export default defineConfig({
  base: "/myapp",
  plugins: [
    react(),
    web({
      moduleId: "ssr-pages",
      dirs:[{
        dir:'ssr/pages',
        route:''
      }]
    }),
    ssr({
      rootDocument: './ssr/root.jsx'
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

### Legacy project

If you use the vite-plugin-pages, you need config the moduleId

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import pages from "vite-plugin-pages";
import ssr from "vite-plugin-ssr-config";

export default defineConfig({
  base: "/myapp",
  plugins: [
    react(),
    // Don't support LAYOUT, Include the Main Layout in root.jsx
    pages({
      moduleId: "ssr-pages",
      routeStyle: "remix",
      dirs: "ssr/pages",
    }),
    ssr({
      rootDocument: "ssr/root.jsx",
    })
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
  ├── bin/             # SSR assets
  ├── public/          # SPA-SSR assets
  └── public/spa/      # SPA assets
```

Enter the 'dist' directory and run the server

```bash
cd dist
node app.js
```

### 7.3 Sandbox Production Server Configuration

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
    // Chech the version
    "@tanstack/react-query": "^5.101.0",
    "express": "^5.2.1",
    "react": "^19.2.6",
    "react-bootstrap": "^2.10.10",
    "react-dom": "^19.2.6",
    "react-router": "^7.17.0",
    "react-slotx": "^0.1.1"
  }
}
```

2. Create `/private/.env` for server configuration:

```ini
SERVER_HOST=127.0.0.1
SERVER_PORT=4000
```

Start the production server for the Sandbox project

```bash
cd dist
yarn install
yarn start
```

> Note: The server will be running at: http://127.0.0.1:4000/myapp

## Additional Resources

For more detailed information and resources related to `vite-plugin-ssr-config`, please refer to the following:

- **npm Package**: [vite-plugin-ssr-config](https://www.npmjs.com/package/vite-plugin-ssr-config)
- **GitHub Repository**: [yracnet/vite-plugin-ssr-config](https://github.com/yracnet/vite-plugin-ssr-config)

- For a complete working example, visit the [GitHub example repository](https://github.com/yracnet/vite-plugin-ssr-config/tree/main/packages/examples/my-ssr-app) and check the `packages/examples/my-ssr-app` directory.
- For more information about the SSR plugin, refer to the [vite-plugin-ssr-config documentation](https://github.com/yracnet/vite-plugin-ssr-config/tree/main/packages/plugin).
- For more information about the WEB routes, refer to the [vite-plugin-web-routes documentation](https://github.com/yracnet/vite-plugin-web-routes).
- For more information about the SLOT, refer to the [react-slotx documentation](https://github.com/yracnet/react-slotx).

## Summary

This tutorial has shown you how to:

- Set up a Vite project with SSR capabilities
- Integrate React Query, React Bootstrap, and React Router
- Create both SSR and SPA versions of your application
- Configure development and production environments
- Handle server-side rendering of React components

The resulting application provides a solid foundation for building performant, server-rendered React applications while maintaining the option to serve a traditional SPA version when needed.
