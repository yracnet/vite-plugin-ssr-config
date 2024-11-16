import { render } from "@ssr/entryServer.jsx";

export const handler = async (req, res, next) => {
  //Force Fix
  if (req.url === "/%3Canonymous%20code%3E" || req.url.endsWith(".js.map")) {
    return next();
  }
  try {
    await render(req, res, next);
  } catch (error) {
    next(error);
  }
};
