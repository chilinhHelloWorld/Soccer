import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import DetailPlayer from "./components/DetailUser";
import Home from "./components/Home";
import Menus from "./components/Menus";
import "./index.css";
import { User } from "./interfaces/InterfaceUser";
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Menus></Menus>
      <Routes>
        {
          //@ts-ignore
          <Route path="/detail/:id" element={<DetailPlayer />} />
        }
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<App />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
