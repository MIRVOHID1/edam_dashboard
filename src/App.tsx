import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Register from "./page/Auth/Register";
import Login from "./page/Auth/Login";
import GeneralLayout from "./components/generalLayout/GeneralLayout";
import "./App.css";

const App: React.FC = () => {
  const location = useLocation();
  const showGeneralLayout = location.pathname !== '/login' && location.pathname !== '/register';

  return (
    <div className="App">
      {showGeneralLayout && <GeneralLayout />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
