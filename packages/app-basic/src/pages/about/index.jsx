import React from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h1>About Us</h1>
          <p>
            This is a simple about page. Here you can describe the purpose of
            your application or company. Add any content you'd like to share
            with your users.
          </p>
          <Button as={Link} to="/" variant="primary">
            Go Back
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
