import { Card } from "react-bootstrap";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { withDelay, withSuspense } from "../../../hooks";

const getPost = (id) =>
  fetch("https://jsonplaceholder.typicode.com/posts/" + id)
    .then((r) => r.json())
    .catch((e) => {
      throw e;
    });

const getPostWithDelay = withDelay(getPost, 200);

function PostPage() {
  const { id } = useParams();
  const { data = {} } = useQuery(["posts", id], () => getPostWithDelay(id));
  return (
    <Card>
      <Card.Header>{data.title}</Card.Header>
      <Card.Body>
        <Card.Text>{data.body}</Card.Text>
        <Card.Link as={Link} to="/posts">
          Back to Posts
        </Card.Link>
      </Card.Body>
    </Card>
  );
}
export default withSuspense(PostPage);
