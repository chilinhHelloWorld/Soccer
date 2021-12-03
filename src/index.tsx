import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import DetailPlayer from "./page/DetailUser";
import Menus from "./components/Menus";
import "./index.css";
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Menus></Menus>
      <Routes>
        {
          //@ts-ignore
          <Route path="/detail/:id" element={<DetailPlayer />} />
        }
        <Route path="/" element={<App />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
