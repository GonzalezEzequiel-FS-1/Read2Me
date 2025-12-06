import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import { SignScreen } from "./Pages/SignScreen";
import { NotFound } from "./Pages/NotFound";
import { Box } from "@mui/material";
import { ProtectedRoute } from "./utils/ProtectedRoutes";
import SimpleBottomNavigation from "./components/BottomNavigation";
const App = () => {
  return (
    <Box
      sx={{
        height: "100vh",
      }}
    >
      <Routes>
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
              {/* <SimpleBottomNavigation /> */}
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<SignScreen />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Box>
  );
};

export default App;
