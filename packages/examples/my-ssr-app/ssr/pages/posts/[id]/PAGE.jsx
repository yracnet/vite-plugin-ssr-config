import { Slot } from "react-slotx";
import { Card } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";

const getPost = (id) =>
  fetch("https://jsonplaceholder.typicode.com/posts/" + id).then((r) =>
    r.json(),
  );

export default function PostPage() {
  const { id } = useParams();
  const { data = [] } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPost(id),
  });
  return (
    <Card>
      <Slot name="head" priority={2}>
        {/* title support only string */}
        <title>{`Post #${id}: ${data.title}`}</title>
        <meta name="description" content={data.body} />
        <meta property="og:title" content={data.title} />
      </Slot>
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
