export const ViteScripts = () => {
  const {
    file = false,
    css = [],
    imports = [],
    assets = [],
  } = process.env.SSR_ENTRY ?? {};
  return (
    <>
      {css.map((href, ix) => (
        <link key={ix} rel="stylesheet" href={href} />
      ))}
      {imports.map((src, i) => (
        <link key={i} rel="modulepreload" href={src} />
      ))}
      {assets.map((href, i) => (
        <link key={i} rel="preload" as="image" href={href} />
      ))}
      {file && <script type="module" src={file} />}
    </>
  );
};
