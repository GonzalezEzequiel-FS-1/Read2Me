import React from "react";
import "./App.css";
import { Home } from "./Pages/Home";
import { Route, Routes } from "react-router-dom";
import { ProtectedLayout } from "./Layouts/ProtectedRoutes/ProtectedRoutes";
import { Login } from "./Pages/Login";
const App = () => {
  return (
    <Routes>
      <Route element={<ProtectedLayout />}>
        <Route path="/home" element={<Home />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};
export default App;
