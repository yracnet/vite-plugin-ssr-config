import { StaticRouter } from "react-router-dom/server";
import { RootRoutes } from "@ssr/rootRoutes.jsx";
import { ErrorBoundary } from "@ssr/errorBoundary.jsx";
import { StrictMode, Suspense } from "react";

export const PageServer = ({ path }) => {
  return (
    <ErrorBoundary suppressHydrationWarning={true}>
      <Suspense>
        <StaticRouter
          location={path}
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <StrictMode>
            <RootRoutes />
          </StrictMode>
        </StaticRouter>
      </Suspense>
    </ErrorBoundary>
  );
};
