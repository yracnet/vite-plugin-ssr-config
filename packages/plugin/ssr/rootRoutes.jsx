import routes from "~react-pages";
import { useRoutes } from "react-router-dom";
import React from "react";
import { RootDocument } from "@ssr/root.jsx";

export const RootRoutes = () => {
  const newRoutes = [
    {
      caseSensitive: false,
      path: "/",
      element: React.createElement(RootDocument),
      children: routes,
    },
  ];
  return useRoutes(newRoutes);
};
