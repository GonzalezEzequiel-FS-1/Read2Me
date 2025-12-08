import { Button } from "@mantine/core";
import React from "react";

export const AcceptBTN = ({ buttonText, onClick }) => {
  return (
    <Button
      onClick={onClick}
      variant="filled"
      color="green"
      fullWidth
      radius="md"
    >
      {buttonText}
    </Button>
  );
};
