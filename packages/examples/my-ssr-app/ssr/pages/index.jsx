import { Button, ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const Index = () => (
  <div>
    <h2>Bienvenido al Blog</h2>
    <ButtonGroup>
      <Button as={Link} to="/posts" variant="outline-primary">
        Ver Posts
      </Button>
      <Button as={Link} to="/error" variant="outline-danger">
        Ver Error
      </Button>
      <Button as="a" href="/spa" variant="outline-success">
        Ir SPA
      </Button>
    </ButtonGroup>
  </div>
);

export default Index;
