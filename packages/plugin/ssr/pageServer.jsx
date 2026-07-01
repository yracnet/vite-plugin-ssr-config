import { ErrorBoundary } from "./errorBoundary.jsx";
import { RootRoutes } from "./rootRoutes.jsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import { StaticRouter } from "react-router";
import { SlotProvider } from "react-slotx";

export const PageServer = ({ basename, location }) => {
  return (
    <StaticRouter basename={basename} location={location}>
      <RootRoutes />
    </StaticRouter>
  );
};
