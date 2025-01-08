import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const IndexPage = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/">
        Mi Logo
      </Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link as={Link} to="/">
          Home
        </Nav.Link>
        <Nav.Link as={Link} to="/about">
          About
        </Nav.Link>
        <Nav.Link as={Link} to="/blog">
          Blog
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default IndexPage;
