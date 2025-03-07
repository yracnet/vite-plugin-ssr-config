import { LiveReload } from "@ssr/liveReload.jsx";
import { ViteScripts } from "@ssr/viteScripts.jsx";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";

export const RootDocument = ({ state, setState }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Vite + React SSR</title>
        <link rel="icon" href="vite.svg" type="image/svg" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <LiveReload />
      </head>
      <body>
        <Container>
          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">Vite SSR</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarNav" />
            <Navbar.Collapse id="navbarNav">
              <Nav className="me-auto">
                <Nav.Link to="/" as={Link}>
                  Home
                </Nav.Link>
                <Nav.Link to="/posts" as={Link}>
                  Posts
                </Nav.Link>
                <Nav.Link href="/myapp/spa">SPA Entry</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Container>
        <Container>
          <Outlet />
        </Container>
        <ViteScripts />
      </body>
    </html>
  );
};
