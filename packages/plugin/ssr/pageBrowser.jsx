import { BrowserRouter } from "react-router-dom";
import { RootRoutes } from "@ssr/rootRoutes.jsx";
import { ErrorBoundary } from "@ssr/errorBoundary.jsx";
import { StrictMode, Suspense } from "react";

export const PageBrowser = () => {
  return (
    <ErrorBoundary>
      <Suspense>
        <BrowserRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <StrictMode>
            <RootRoutes />
          </StrictMode>
        </BrowserRouter>
      </Suspense>
    </ErrorBoundary>
  );
};
