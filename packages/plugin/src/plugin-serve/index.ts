import fs from "fs-extra";
import path from "path";
import { PluginOption } from "vite";
import { SSRConfig } from "../model.js";
import { finalUrl } from "../utils.js";

export const pluginServe = (ssrConfig: SSRConfig): PluginOption => {
  const { entryClient, root } = ssrConfig;
  return {
    name: "vite-plugin-ssr-config:serve",
    enforce: "post",
    apply: "serve",
    config: ({ base = "/" }) => {
      const ssrClientEntry = finalUrl(base, entryClient);
      return {
        appType: "custom",
        define: {
          "process.env.SSR_BASENAME": JSON.stringify(base),
          "process.env.SSR_ENTRY_CLIENT": JSON.stringify(ssrClientEntry),
        },
      };
    },
    configureServer: async (devServer) => {
      return async () => {
        // HTML Serve
        devServer.middlewares.use(async (req: any, res, next) => {
          const indexHtmlPath = path.join(root, req.url, "index.html");
          if (fs.existsSync(indexHtmlPath)) {
            return devServer
              .transformIndexHtml(
                req.url,
                fs.readFileSync(indexHtmlPath, "utf-8")
              )
              .then((html) => {
                res.setHeader("Content-Type", "text/html");
                res.setHeader("Pragma", "no-cache");
                res.setHeader("Expires", "0");
                res.end(html);
              });
          }
          next();
        });
        devServer.middlewares.use(async (req, res, next) => {
          try {
            //@ts-ignore
            process.env.SSR = true;
            const mod = await devServer.ssrLoadModule("@ssr/handler.js", {
              fixStacktrace: true,
            });
            await mod.handler(req, res, next);
          } catch (error) {
            next(error);
          }
        });
      };
    },
  };
};
