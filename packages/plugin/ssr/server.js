import { handler } from "@ssr/handler.js";
import express from "express";
const app = express();

const route = express.Router();
route.use(express.static(process.env.SSR_PUBLIC_DIR));
route.use(handler);

app.use(process.env.SSR_BASENAME, route);
app.use((_, res) => {
  res.status(404).send("Not Found");
});
app.use((err, _, res) => {
  console.error(err);
  res.status(500).send("Internal Server Error");
});
const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || 3000;
app
  .listen(PORT, HOST, () => {
    console.log(`Server is listening on http://${HOST}:${PORT}`);
  })
  .on("error", (error) => {
    console.error("Server error:", error);
  });
