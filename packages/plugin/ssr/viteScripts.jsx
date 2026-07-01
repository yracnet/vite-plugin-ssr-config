export const ViteScripts = ({
  preloadAssets = false,
  preloadImports = false,
  preloadStylesheet = true,
}) => {
  const {
    file = false,
    stylesheet = [],
    imports = [],
    assets = [],
  } = process.env.SSR_ENTRY ?? {};
  return (
    <>
      {preloadStylesheet &&
        stylesheet.map((href, ix) => (
          <link key={ix} rel="stylesheet" href={href} />
        ))}
      {preloadImports &&
        imports.map((src, i) => (
          <link key={i} rel="modulepreload" href={src} />
        ))}
      {preloadAssets &&
        assets.map((href, i) => (
          <link key={i} rel="preload" as="image" href={href} />
        ))}
      {file && <script type="module" src={file} />}
    </>
  );
};
