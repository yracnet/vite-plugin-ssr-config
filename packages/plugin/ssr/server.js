import { handler } from "@ssr/handler.js";
import express from "express";
import path from "path";
const app = express();
app.use(express.static(path.resolve(process.env.CSR_DIR)));
app.use(handler);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
