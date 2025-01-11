import { ErrorBoundary } from "@ssr/errorBoundary.jsx";
import { RootRoutes } from "@ssr/rootRoutes.jsx";
import { StrictMode, Suspense } from "react";
import { dehydrate, QueryClient, QueryClientProvider } from "react-query";
import { StaticRouter } from "react-router-dom/server";

export const PageServer = ({ path, state, setState }) => {
  const queryServer = new QueryClient({
    defaultOptions: {
      queries: {
        suspense: true,
      },
    },
  });
  queryServer.getQueryCache().subscribe(() => {
    const state = dehydrate(queryServer);
    setState(state);
  });
  return (
    <ErrorBoundary suppressHydrationWarning={true}>
      <QueryClientProvider client={queryServer}>
        <Suspense>
          <StaticRouter
            basename={process.env.SSR_BASENAME}
            location={path}
            future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
          >
            <StrictMode>
              <RootRoutes state={state} setState={setState} />
            </StrictMode>
          </StaticRouter>
        </Suspense>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};
