import React, { useContext } from "react";
import ButtonUsage from "../components/ButtonUsage";
import { Box, Button, Container, Typography } from "@mui/material";
import { Logout } from "@mui/icons-material";
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
        <Button onClick={appSignOut}>
          <Logout />
        </Button>
      </Container>
    </Box>
  );
};

export default Home;
