import React, { useContext } from "react";
import { FileUploader } from "../components/FileUploader";
import { Box, Button, Container, IconButton, Typography } from "@mui/material";
import { FileUpload, Logout } from "@mui/icons-material";
import { AuthContext } from "../Context/ContextDeclaration/AuthContext";
import PdfViewer from "../components/PdfViewer";

const Home = () => {
  const { appSignOut } = useContext(AuthContext);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <PdfViewer file="/Yb.pdf" />

      <IconButton onClick={appSignOut}>
        <Logout />
      </IconButton>
      <FileUploader />
    </Box>
  );
};

export default Home;
