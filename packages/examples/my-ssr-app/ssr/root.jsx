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
