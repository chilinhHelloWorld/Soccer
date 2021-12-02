import React from 'react';
import { render } from "react-dom";
import './App.css';
import Menus from './components/Menus';
import UserList from './components/UserList';
import Home from './components/Home';
function App() {
  return (
    <div>
      <Menus></Menus>
      <UserList></UserList>
    </div>
  );
}

export default App;
