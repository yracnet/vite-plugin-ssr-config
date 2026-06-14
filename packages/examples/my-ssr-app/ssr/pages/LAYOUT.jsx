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
