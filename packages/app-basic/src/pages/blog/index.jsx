import { Suspense, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  Navbar,
  Nav,
  Container,
  Spinner,
  Card,
  Button,
  ListGroup,
  Row,
  Col,
} from "react-bootstrap";
const Component = () => {
  const [posts, setPosts] = useState([]);
  const onLoad = async () => {
    try {
      const r = await fetch("https://jsonplaceholder.typicode.com/posts");
      const v = await r.json();
      setPosts(v);
    } catch (e) {}
  };
  useEffect(() => {
    onLoad();
  }, []);
  return (
    <div>
      <a href="#" onClick={onLoad}>
        Reload Posts
      </a>
      <Row>
        {posts.map((post) => (
          <Col key={post.id} sm={12} md={6} lg={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.body}</Card.Text>
                <Card.Link as={Link} to={`/blog/${post.id}`}>
                  Go
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Component;
