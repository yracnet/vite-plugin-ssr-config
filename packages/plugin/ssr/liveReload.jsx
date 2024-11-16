const PRODUCTION = () => null;

const DEVELOPMENT = () => {
  const finalUrl = (base, path) => {
    return `${base.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
  };
  const __html = `
import RefreshRuntime from "${finalUrl(
    import.meta.env.BASE_URL,
    "/@react-refresh"
  )}"
RefreshRuntime.injectIntoGlobalHook(window)
window.$RefreshReg$ = () => {}
window.$RefreshSig$ = () => (type) => type
window.__vite_plugin_react_preamble_installed__ = true; 
`;
  return (
    <>
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html }}
        suppressHydrationWarning={true}
      ></script>
      <script
        type="module"
        src={finalUrl(import.meta.env.BASE_URL, "/@vite/client")}
        suppressHydrationWarning={true}
      ></script>
    </>
  );
};

export const LiveReload = import.meta.env.PROD ? PRODUCTION : DEVELOPMENT;
