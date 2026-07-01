import { QueryClient } from "@tanstack/react-query";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { PageBrowser } from "./pageBrowser.jsx";
import { SlotClient } from "react-slotx";
import { AppShell } from "./appShell.jsx";

startTransition(() => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        suspense: false,
      },
    },
  });
  const slotClient = new SlotClient();
  const hydratedState = JSON.parse(atob(window.__HYDRATED_STATE__));
  hydrateRoot(
    document,
    <StrictMode>
      <AppShell
        queryClient={queryClient}
        hydratedState={hydratedState}
        slotClient={slotClient}
      >
        <PageBrowser basename={process.env.SSR_BASENAME} />
      </AppShell>
    </StrictMode>,
    {
      onRecoverableError: (error, { componentStack }) => {
        const logs = componentStack?.split("\n");
        console.log("Hydrate Error:", error, logs);
      },
    },
  );
});
