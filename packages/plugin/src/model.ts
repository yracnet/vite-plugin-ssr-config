import { UserConfig } from "vite";

export type SSRConfig = {
  mode: "ssr:clean" | "ssr:server" | "ssr:client";
  root: string;

  entryClient: string;
  entryServer: string;
  rootDocument: string;
  server: string;
  handler: string;

  pageServer: string;
  pageBrowser: string;
  rootRoutes: string;
  errorBoundary: string;

  liveReload: string;
  viteScripts: string;

  outDir: string;
  clientDir: string;
  serverDir: string;
  assetDir: string;
  chunkDir: string;

  clientConfig: (config: UserConfig) => UserConfig;
  serverConfig: (config: UserConfig) => UserConfig;
};

export type SSRUserConfig = Partial<SSRConfig>;
