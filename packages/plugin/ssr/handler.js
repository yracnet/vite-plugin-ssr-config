import express from "express";
import { render } from "./entryRender.jsx";

const ignored = [
  /^\/%3Canonymous%20code%3E$/,
  /\.js\.map$/,
  /\.css\.map$/,
];

export const handler = async (req, res, next) => {
  if (req.method !== "GET" || ignored.some((pattern) => pattern.test(req.path))) {
    return next();
  }
  try {
    await render(req, res, next);
  } catch (error) {
    next(error);
  }
};