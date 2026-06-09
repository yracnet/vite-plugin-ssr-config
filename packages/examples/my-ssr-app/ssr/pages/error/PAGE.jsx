import { useState } from "react";
import { Button, Container } from "react-bootstrap";
export default function ErrorPage() {
  const [error, setError] = useState(false);
  if (error) {
    throw new Error(error);
  }
  const onClick = () => {
    setError("Custom Error on ErrorPage");
  };
  return (
    <Container>
      <Button onClick={onClick}>Clik Me</Button>
    </Container>
  );
}
