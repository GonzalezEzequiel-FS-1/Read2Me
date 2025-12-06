import React, { useContext } from "react";
import { FileUploader } from "../components/FileUploader";
import { Box, Button, Container, IconButton, Stack, Typography } from "@mui/material";
import { FileUpload, Logout } from "@mui/icons-material";
import { AuthContext } from "../Context/ContextDeclaration/AuthContext";
import PdfViewer from "../components/PdfViewer";
import { LoadFiles } from "../utils/loadFiles";

const Home = () => {
  const { user, loading } = useContext(AuthContext);
  const testFile = "recibo_fotos_ninas.pdf";
  const uid = user?.uid;
  const filePath = `http://localhost:3003/file/${uid}/${testFile}`;
  const { appSignOut } = useContext(AuthContext);

  return (
    <Stack
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {/* <PdfViewer file={filePath} /> */}

      <IconButton onClick={appSignOut}>
        <div style={{
          height:"50vh"
        }}>
          <LoadFiles />
        </div>
        
        <Logout />
      </IconButton>
      <FileUploader />
    </Stack>
  );
};

export default Home;
