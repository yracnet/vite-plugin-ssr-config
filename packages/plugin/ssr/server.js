import { handler } from "@ssr/handler.js";
import express from "express";
const app = express();
app.use(express.static(process.env.SSR_PUBLIC_DIR));
app.use(handler);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
