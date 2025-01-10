import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Index = () => (
  <div>
    <h2>Bienvenido al Blog</h2>
    <Button as={Link} to="/posts">
      Ver Posts
    </Button>
    <a href="/spa">Ir SPA</a>
  </div>
);

export default Index;
