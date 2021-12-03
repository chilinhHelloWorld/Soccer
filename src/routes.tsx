import React from "react";
import NotFoundPage from "./components/NotFoundPage";
import App from "./App";
//----------------------------------------------------------------------------------
/**
 * /**
 * @author LinhNC
 * Routes
 */
const routes = [
  {
    path: "/home",
    element: <App />,
  },
  {
    path: "/",
    element: <NotFoundPage />,
  },
];
export default routes;
