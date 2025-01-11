import { RootDocument } from "@ssr/root.jsx";
import React from "react";
import { useRoutes } from "react-router-dom";
import routes from "~react-pages";

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
