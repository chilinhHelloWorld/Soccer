import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './components/Login';
import { BrowserRouter as Router } from 'react-router-dom';
import { useNavigate, Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from './components/Home';
import DetailUser from './components/DetailUser';


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/UserDetail" element={<DetailUser></DetailUser>} />
        <Route path="/Home" element={<Home />} />
        <Route path="/" element={<App />} />

      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
