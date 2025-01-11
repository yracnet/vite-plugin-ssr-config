import { PageBrowser } from "@ssr/pageBrowser.jsx";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

startTransition(() => {
  const hydratedState = JSON.parse(atob(window.__HYDRATED_STATE__));
  const setHydratedState = () => {
    throw Error("Changes Not Allowed");
  };
  hydrateRoot(
    document,
    <StrictMode>
      <PageBrowser
        hydratedState={hydratedState}
        setHydratedState={setHydratedState}
      />
    </StrictMode>,
    {
      onRecoverableError: (error, { componentStack }) => {
        const logs = componentStack?.split("\n");
        console.log("Error:", error, logs);
      },
    }
  );
});
