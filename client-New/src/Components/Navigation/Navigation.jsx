import { Button, Container, Flex, Text } from "@mantine/core";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export const Navigation = () => {
  const { signOff } = useContext(AuthContext);
  return (
    <Flex
      dir="row"
      align={"center"}
      justify={"space-around"}
      bg={"Red"}
      w={"100%"}
      flex
    >
      <Text>Logo</Text>
      <Text>Title</Text>
      <Button onClick={signOff}>Logout</Button>
    </Flex>
  );
};
