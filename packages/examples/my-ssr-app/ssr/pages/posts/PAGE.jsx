import { Slot } from "react-slotx";
import { Card, Col, Row } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

const getPosts = () =>
  fetch("https://jsonplaceholder.typicode.com/posts").then((r) => r.json());

export default function PostsPage() {
  const { data = [] } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
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
                <Card.Link as={Link} to={`/posts/${post.id}`}>
                  Read More
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Slot name="head" priority={2}>
        {/* title support only string */}
        <title>{`Post List ${data.length} Rows`}</title>
      </Slot>
    </div>
  );
}
