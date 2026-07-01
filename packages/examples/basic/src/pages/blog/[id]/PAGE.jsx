import { Suspense, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link, useParams } from "react-router";
import { Slot } from "react-slotx";
import { useQuery } from "@tanstack/react-query";

const fetchPost = async (id) => {
  const r = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  console.log(">>>", r);
  if (!r.ok) {
    throw new Error(`Error fetching post: ${id}`);
  }
  return await r.json();
};

const Component = () => {
  const { id } = useParams();
  const {
    data: post = {},
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPost(id),
    enabled: !!id, // importante
    staleTime: 1000 * 60,
  });
  const title = `Post: ${post.title}`;
  return (
    <Card>
      <Slot name="head" priority={2}>
        <title>{title}</title>
      </Slot>
      <Card.Header>{post.title}</Card.Header>
      <Card.Body>
        <Card.Text>{post.body}</Card.Text>
        <Card.Link as={Link} to={`/blog`}>
          Go back
        </Card.Link>
        <Card.Link onClick={refetch} href="#">
          Reload
        </Card.Link>
      </Card.Body>
    </Card>
  );
};

export default () => (
  <Suspense fallback={<h1>Cargando....</h1>}>
    <Component />
  </Suspense>
);
