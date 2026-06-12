import { ErrorBoundary } from "@ssr/errorBoundary.jsx";
import { RootRoutes } from "@ssr/rootRoutes.jsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import { BrowserRouter } from "react-router";

export const PageBrowser = ({ basename, queryClient }) => {
  return (
    <ErrorBoundary suppressHydrationWarning={true}>
      <QueryClientProvider client={queryClient}>
        <Suspense>
          <BrowserRouter basename={basename}>
            <RootRoutes />
          </BrowserRouter>
        </Suspense>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};
