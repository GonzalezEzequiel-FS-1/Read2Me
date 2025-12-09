import React from "react";
import "./App.css";
import { Home } from "./Pages/Home";
import { Route, Routes } from "react-router-dom";
import { ProtectedLayout } from "./Layouts/ProtectedRoutes/ProtectedRoutes";
import { Login } from "./Pages/Login";
import { ServerHealth } from "./Components/ServerHealth";
const App = () => {
  return (
    <Routes>
      <Route element={<ProtectedLayout />}>
        <Route path="/home" element={<Home />} />
      </Route>
      <Route path="/" element={<Login />} />
    </Routes>
  );
};
export default App;
