import { RootDocument } from "@ssr/root.jsx";
import React from "react";
import { useRoutes } from "react-router-dom";
import routes from "~react-pages";

export const RootRoutes = ({ state, setState }) => {
  const newRoutes = [
    {
      caseSensitive: false,
      path: "",
      element: React.createElement(RootDocument, { state, setState }),
      children: routes,
    },
  ];
  return useRoutes(newRoutes);
};
