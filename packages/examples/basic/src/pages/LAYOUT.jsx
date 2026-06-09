import { Suspense } from "react";
import { Link, Outlet } from "react-router";
import { Container, Nav, Navbar, Spinner } from "react-bootstrap";
import { Ledger } from "../atom/ledger";

const MainLayout = () => {
  return (
    <>
      <Ledger />
      <Suspense fallback={<Spinner animation="border" variant="primary" />}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default MainLayout;
