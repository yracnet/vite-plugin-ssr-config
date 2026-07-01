import { ErrorBoundary } from "./errorFallback.jsx";
import { RootRoutes } from "./rootRoutes.jsx";
import { HydrationBoundary, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import { BrowserRouter } from "react-router";
import { SlotProvider } from "react-slotx";

export const PageBrowser = ({ basename }) => {
  return (
    <BrowserRouter basename={basename}>
      <RootRoutes />
    </BrowserRouter>
  );
};
