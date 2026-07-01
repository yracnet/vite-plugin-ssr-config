import { HydrationBoundary, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./errorFallback.jsx";
import { SlotProvider } from "react-slotx";

export const AppShell = ({
  children,
  queryClient,
  hydratedState = {},
  slotClient,
}) => {
  return (
    <ErrorBoundary fallbackRender={ErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={hydratedState}>
          <SlotProvider client={slotClient}>{children}</SlotProvider>
        </HydrationBoundary>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};
