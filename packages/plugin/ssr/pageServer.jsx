import { ErrorBoundary } from "@ssr/errorBoundary.jsx";
import { RootRoutes } from "@ssr/rootRoutes.jsx";
import { StrictMode, Suspense } from "react";
import { StaticRouter } from "react-router-dom/server";

export const PageServer = ({ path }) => {
  return (
    <ErrorBoundary suppressHydrationWarning={true}>
      <Suspense>
        <StaticRouter
          basename={process.env.SSR_BASENAME}
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
