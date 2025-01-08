import { Suspense } from "react";
import { Link, Outlet } from "react-router-dom";
import { Container, Nav, Navbar, Spinner } from "react-bootstrap";

const Blog = () => {
  return (
    <Container className="mt-5">
      <Navbar className="m-4">
        <Navbar.Brand as={Link} to="/">
          <h1>My Blog</h1>
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/blog">
            All Posts
          </Nav.Link>
        </Nav>
      </Navbar>
      <Suspense fallback={<Spinner animation="border" variant="primary" />}>
        <Outlet />
      </Suspense>
    </Container>
  );
};

export default Blog;
