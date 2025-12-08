import { PasswordInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";

export const PasswordInputField = ({ value, onChange, placeholder }) => {
  const [visible, { toggle }] = useDisclosure(false);
  return (
    <PasswordInput
      visible={visible}
      onVisibilityChange={toggle}
      value={value}
      onChange={onChange}
      withAsterisk
      placeholder={placeholder}
    />
  );
};
