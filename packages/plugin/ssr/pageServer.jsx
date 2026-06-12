import { ErrorBoundary } from "@ssr/errorBoundary.jsx";
import { RootRoutes } from "@ssr/rootRoutes.jsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import { StaticRouter } from "react-router";

export const PageServer = ({ basename, location, queryClient }) => {
  return (
    <ErrorBoundary suppressHydrationWarning={true}>
      <QueryClientProvider client={queryClient}>
        <Suspense>
          <StaticRouter basename={basename} location={location}>
            <RootRoutes />
          </StaticRouter>
        </Suspense>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};
