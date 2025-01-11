import { PageBrowser } from "@ssr/pageBrowser.jsx";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

startTransition(() => {
  let state = window.__STATE__;
  window.__STATE__ = null;
  const setState = (newState) => {
    state = newState;
  };
  hydrateRoot(
    document,
    <StrictMode>
      <PageBrowser state={state} setState={setState} />
    </StrictMode>,
    {
      onRecoverableError: (error, { componentStack }) => {
        const logs = componentStack?.split("\n");
        console.log("Error:", error, logs);
      },
    }
  );
});
