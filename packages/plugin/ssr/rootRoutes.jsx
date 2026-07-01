import { RootDocument } from "./root.jsx";
import React from "react";
import { useRoutes } from "react-router";
import routes from "ssr-pages";

export const RootRoutes = (props) => {
  const newRoutes = [
    {
      caseSensitive: false,
      path: "",
      element: React.createElement(RootDocument, props),
      children: routes,
    },
  ];
  return useRoutes(newRoutes);
};
