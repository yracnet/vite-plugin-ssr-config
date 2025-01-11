import { Button, Card } from "react-bootstrap";
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
    <Card className="w-50 m-auto mt-5">
      <Card.Header>{data.title}</Card.Header>
      <Card.Body>
        <Card.Text>{data.body}</Card.Text>
        <Link to="/posts">
          <Button>Back to Post</Button>
        </Link>
        <Card.Img
          variant=""
          src={`https://placehold.jp/272728/f8f9fa/400x50.png?text=${data.title}&css={"font-size":"16px"}`}
          alt="Fondo Gris Oscuro con Texto Claro"
        />
        <Card.Img
          variant=""
          src={`https://placehold.jp/f8f9fa/272728/400x50.png?text=${data.title}&css={"font-size":"16px"}`}
          alt="Fondo Gris Claro con Texto Oscuro"
        />
        <Card.Img
          variant=""
          src={`https://placehold.jp/e0e0e0/111111/400x50.png?text=${data.title}&css={"font-size":"16px"}`}
          alt="Fondo Gris con Detalles Neón"
        />
        <Card.Img
          variant=""
          src={`https://placehold.jp/e0bbe4/272728/400x50.png?text=${data.title}&css={"font-size":"16px"}`}
          alt="Pastel Lila y Pastel Amarillo"
        />
      </Card.Body>
      <Card.Img
        variant="bottom"
        src={`https://placehold.jp/red/272728/400x50.png?text=${data.title}&css={"font-size":"16px"}`}
      />
    </Card>
  );
}
export default withSuspense(PostPage);
