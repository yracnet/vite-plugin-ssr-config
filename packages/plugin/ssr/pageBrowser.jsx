import { ErrorBoundary } from "@ssr/errorBoundary.jsx";
import { RootRoutes } from "@ssr/rootRoutes.jsx";
import { StrictMode, Suspense } from "react";
import { QueryClient, QueryClientProvider, hydrate } from "react-query";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: false,
    },
  },
});

export const PageBrowser = ({ hydratedState = {}, setHydratedState }) => {
  hydrate(queryClient, hydratedState);
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Suspense>
          <BrowserRouter
            basename={process.env.SSR_BASENAME}
            future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
          >
            <StrictMode>
              <RootRoutes
                hydratedState={hydratedState}
                setHydratedState={setHydratedState}
              />
            </StrictMode>
          </BrowserRouter>
        </Suspense>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};
