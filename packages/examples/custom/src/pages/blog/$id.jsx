import { Card } from "react-bootstrap";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
const getPost = (id) =>
  fetch("https://jsonplaceholder.typicode.com/posts/" + id).then((r) =>
    r.json()
  );

const Component = () => {
  const { id } = useParams();
  const { data } = useQuery(["posts", id], () => getPost(id), {
    // Force Resolve in SSR
    suspense: true,
  });
  return (
    <Card>
      <Card.Header>{data.title}</Card.Header>
      <Card.Body>
        <Card.Text>{data.body}</Card.Text>
        <Card.Link as={Link} to={`/blog`}>
          Go back
        </Card.Link>
      </Card.Body>
    </Card>
  );
};

export default Component;
