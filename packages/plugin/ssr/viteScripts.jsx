export const ViteScripts = () => {
  return (
    <>
      <script type="module" src={process.env.SSR_ENTRY_CLIENT}></script>
    </>
  );
};
