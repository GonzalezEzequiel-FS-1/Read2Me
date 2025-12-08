import { Button, Container, Flex, Text } from "@mantine/core";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export const Home = () => {
  const { user, signOff } = useContext(AuthContext);
  const [loggedInUser, setLoggedinUser] = useState("");
  const handleAssignUser = () => {
    console.log(user.displayName);
    setLoggedinUser(user.displayName);
  };

  return (
    <div>
      <Button onClick={handleAssignUser}>TestUser</Button>
      <h1>Hello, {loggedInUser || "User"}</h1>
      <button onClick={signOff}>Sign Off</button>
    </div>
  );
};
