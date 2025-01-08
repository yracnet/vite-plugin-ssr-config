import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Section = styled.div`
  width: 100%;
  > h1 {
    color: red;
  }
  > p {
    fontsize: 10px;
    color: gray;
  }
`;
const About = () => {
  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <Section>
            <h1>About Us</h1>
            <p>
              This is a simple about page. Here you can describe the purpose of
              your application or company. Add any content you'd like to share
              with your users.
            </p>
            <Link to="/">Go Back</Link>
          </Section>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
