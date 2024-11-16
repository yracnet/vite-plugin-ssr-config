import { PageBrowser } from "@ssr/pageBrowser.jsx";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <PageBrowser />
    </StrictMode>,
    {
      onRecoverableError: (error, { componentStack }) => {
        const logs = componentStack.split("\n");
        console.log("Error:", logs);
      },
    }
  );
});
