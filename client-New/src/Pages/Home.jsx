import { Button, Container, Flex, Space, Text } from "@mantine/core";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { UploadComponent } from "../Components/UploadComponent";
import { DocumentGrid } from "../Components/Cards/DocumentGrid";

export const Home = () => {
  const { user, signOff } = useContext(AuthContext);
  const [loggedInUser, setLoggedinUser] = useState("");
  const handleAssignUser = () => {
    console.log(user.displayName);
    setLoggedinUser(user.displayName);
  };

  return (
    <div className="h-full w-screen items-center py-10 justify-between flex flex-col">
      <UploadComponent />
      <Space mt={"xl"} />
      <DocumentGrid />

      <Button onClick={signOff}>Sign Off</Button>
    </div>
  );
};
