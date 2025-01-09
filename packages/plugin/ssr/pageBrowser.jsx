import { ErrorBoundary } from "@ssr/errorBoundary.jsx";
import { RootRoutes } from "@ssr/rootRoutes.jsx";
import { StrictMode, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";

export const PageBrowser = () => {
  return (
    <ErrorBoundary>
      <Suspense>
        <BrowserRouter
          basename={process.env.SSR_BASENAME}
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
