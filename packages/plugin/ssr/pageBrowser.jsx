import { ErrorBoundary } from "@ssr/errorBoundary.jsx";
import { RootRoutes } from "@ssr/rootRoutes.jsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import { BrowserRouter } from "react-router";
import { SlotProvider } from "react-slotx";

export const PageBrowser = ({ basename, queryClient, slotClient }) => {
  return (
    <ErrorBoundary suppressHydrationWarning={true}>
      <QueryClientProvider client={queryClient}>
        <Suspense>
          <SlotProvider client={slotClient}>
            <BrowserRouter basename={basename}>
              <RootRoutes />
            </BrowserRouter>
          </SlotProvider>
        </Suspense>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};
