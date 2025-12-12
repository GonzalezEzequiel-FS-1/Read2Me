import React from "react";
import "./App.css";
import { Home } from "./Pages/Home";
import { Route, Routes } from "react-router-dom";
import { ProtectedLayout } from "./Layouts/ProtectedRoutes/ProtectedRoutes";
import { Login } from "./Pages/Login";
import { Library } from "./Pages/Library";
import { Read } from "./Pages/Read";
import { History } from "./Pages/History";
import { Testing } from "./Pages/Testing";
const App = () => {
  return (
    <Routes>
      <Route element={<ProtectedLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/library" element={<Library />} />
        <Route path="/read" element={<Read />} />
        <Route path="/history" element={<History />} />
      </Route>
      <Route path="/" element={<Login />} />
      <Route path="/test" element={<Testing />} />
    </Routes>
  );
};
export default App;
