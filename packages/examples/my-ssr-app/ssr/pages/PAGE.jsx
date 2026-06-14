import { Slot } from "react-slotx";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router";

export default function HomePage() {
  return (
    <Container>
      <h1>Welcome to the Vite + React SSR App</h1>
      <Button as={Link} to="/posts">
        Go to Posts
      </Button>
      <Slot name="head" priority={2}>
        <title>Home — Vite SSR App</title>
        <meta name="description" content="Welcome to the Vite + React SSR App" />
      </Slot>
    </Container>
  );
}