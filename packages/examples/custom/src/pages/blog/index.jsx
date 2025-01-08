import { Card, Col, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

const getPosts = () =>
  fetch("https://jsonplaceholder.typicode.com/posts").then((r) => r.json());

const Component = () => {
  const { data } = useQuery("posts", getPosts, {
    // Force Resolve in SSR
    suspense: true,
  });
  return (
    <div>
      <Row>
        {data.map((post) => (
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
