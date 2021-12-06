import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import Menus from "./components/Menus";
import "./index.css";
import DetailPlayer from "./page/DetailUser";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Menus></Menus>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/detail/:id" element={<DetailPlayer />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
