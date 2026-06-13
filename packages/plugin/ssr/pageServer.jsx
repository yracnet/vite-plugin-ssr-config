import { ErrorBoundary } from "@ssr/errorBoundary.jsx";
import { RootRoutes } from "@ssr/rootRoutes.jsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import { StaticRouter } from "react-router";
import { SlotProvider } from "react-slotx";

export const PageServer = ({ basename, location, queryClient, slotClient }) => {
  return (
    <ErrorBoundary suppressHydrationWarning={true}>
      <QueryClientProvider client={queryClient}>
        <Suspense>
          <SlotProvider client={slotClient}>
            <StaticRouter basename={basename} location={location}>
              <RootRoutes />
            </StaticRouter>
          </SlotProvider>
        </Suspense>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};
