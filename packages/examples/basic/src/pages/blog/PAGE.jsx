import { Suspense, useEffect, useState } from "react";
import { data, Link, Outlet } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Slot } from "react-slotx";
import {
  Navbar,
  Nav,
  Container,
  Spinner,
  Card,
  Button,
  Row,
  Col,
} from "react-bootstrap";

const fetchPosts = async () => {
  const r = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!r.ok) throw new Error("Error fetching posts");
  return r.json();
};

const Component = () => {
  const {
    data: posts = [],
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 1000 * 60,
  });
  const title = `Posts #${data.length} Records`;
  return (
    <div>
      <Slot name="head" priority={2}>
        <title>{title}</title>
      </Slot>
      <a href="#" onClick={refetch}>
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

export default () => (
  <Suspense fallback={<h1>Cargando....</h1>}>
    <Component />
  </Suspense>
);
