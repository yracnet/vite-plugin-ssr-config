import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

const Component = () => {
  const { id } = useParams();
  const [post, setPost] = useState([]);
  const onLoad = async () => {
    try {
      const r = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
      const v = await r.json();
      setPost(v);
    } catch (e) {}
  };
  useEffect(() => {
    onLoad();
  }, [id]);
  return (
    <Card>
      <Card.Header>{post.title}</Card.Header>
      <Card.Body>
        <Card.Text>{post.body}</Card.Text>
        <Card.Link as={Link} to={`/blog`}>
          Go back
        </Card.Link>
      </Card.Body>
    </Card>
  );
};

export default Component;
