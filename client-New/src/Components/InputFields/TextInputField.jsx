import { TextInput } from "@mantine/core";
import React from "react";

export const TextInputField = ({
  value,
  onChange,
  label,
  description,
  placeholder,
  icon,
  error,
}) => {
  return (
    <TextInput
      value={value}
      onChange={onChange}
      label={label}
      description={description}
      placeholder={placeholder}
      leftSection={icon}
      error={error}
    />
  );
};
