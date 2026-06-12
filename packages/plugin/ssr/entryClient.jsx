import { QueryClient, hydrate } from "@tanstack/react-query";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { PageBrowser } from "./pageBrowser.jsx";

startTransition(() => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        suspense: false,
      },
    },
  });
  const hydratedState = JSON.parse(atob(window.__HYDRATED_STATE__));
  hydrate(queryClient, hydratedState);
  hydrateRoot(
    document,
    <StrictMode>
      <PageBrowser
        basename={process.env.SSR_BASENAME}
        queryClient={queryClient}
      />
    </StrictMode>,
    {
      onRecoverableError: (error, { componentStack }) => {
        const logs = componentStack?.split("\n");
        console.log("Error:", error, logs);
      },
    },
  );
});
