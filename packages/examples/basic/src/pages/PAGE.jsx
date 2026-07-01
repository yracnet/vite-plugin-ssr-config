import React, { Suspense } from "react";
import { Link } from "react-router";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Slot } from "react-slotx";

const IndexPage = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Slot name="head" priority={2}>
        <title>Wellcom to My Site</title>
      </Slot>
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

export default ()=><Suspense fallback={<h1>Cargando....</h1>}><IndexPage/></Suspense>;;
