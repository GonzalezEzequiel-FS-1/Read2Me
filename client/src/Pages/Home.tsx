import React, { useContext } from "react";
import {FileUploader} from '../components/FileUploader'
import { Box, Button, Container, IconButton, Typography } from "@mui/material";
import { FileUpload, Logout } from "@mui/icons-material";
import { AuthContext } from "../Context/ContextDeclaration/AuthContext";

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
      <Container>
        <Typography variant="h2">Top</Typography>
      </Container>
      <Container>
        <Typography variant="h2">Mid</Typography>
      </Container>
      <Container>
        <Typography variant="h2">Bottom</Typography>
        <IconButton onClick={appSignOut}>
          <Logout />
        </IconButton>
        <FileUploader />
      </Container>
    </Box>
  );
};

export default Home;
