import { UserConfig } from "vite";

export type SSRConfig = {
  root: string;

  entryClient: string;
  entryRender: string;

  server: string;
  handler: string;

  rootDocument: string;
  pageServer: string;
  pageBrowser: string;
  rootRoutes: string;
  errorBoundary: string;
  liveReload: string;
  viteScripts: string;

  clientOutDir: string;
  clientMinify: boolean | "terser" | "esbuild";
  clientBuild: (config: UserConfig) => UserConfig;

  serverOutDir: string;
  serverMinify: boolean | "terser" | "esbuild";
  serverBuild: (config: UserConfig) => UserConfig;

  disableBuild: boolean;
};

export type SSRUserConfig = Partial<SSRConfig>;
