import { handler } from "@ssr/handler.js";
import { loadEnv } from "dotenv-local";
import express from "express";

const BASENAME = process.env.SSR_BASENAME || "/";
const PUBLIC_DIR = process.env.SSR_PUBLIC_DIR || "client";

const { HOST = "127.0.0.1", PORT = "3000" } = loadEnv({
  envPrefix: ["SERVER_"],
  removeEnvPrefix: true,
});

// APP
const app = express();
if (BASENAME !== "/") {
  app.use((req, res, next) => {
    if (req.url === "/") {
      res.redirect(BASENAME);
    } else {
      next();
    }
  });
}

// SSR
const route = express.Router();
route.use(express.static(PUBLIC_DIR));
route.use(handler);

// SITE
app.use(BASENAME, route);

app.use((_, res) => {
  res.status(404).send("Not Found");
});

app.use((err, _, res) => {
  console.error(err);
  res.status(500).send("Internal Server Error");
});

// RUN
app
  .listen(PORT, HOST, () => {
    console.log(`Server is listening on http://${HOST}:${PORT}`);
  })
  .on("error", (error) => {
    console.error("Server error:", error);
  });
