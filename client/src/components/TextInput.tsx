import { TextField } from "@mui/material";
import React from "react";

interface TextInputProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

  // Optional props
  variant?: "outlined" | "filled" | "standard";
  fullWidth?: boolean;
  type?: string;
  placeholder?: string;
  error?: boolean;
  helperText?: string;

  // Forward any other valid TextField props (size, multiline, etc.)
  [key: string]: any;
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      label,
      value,
      onChange,
      variant = "outlined",
      fullWidth = true,
      ...rest // captures type, placeholder, error, helperText, size, multiline, etc.
    },
    ref
  ) => {
    return (
      <TextField
        label={label}
        value={value}
        onChange={onChange}
        variant={variant}
        fullWidth={fullWidth}
        inputRef={ref} // important for focusing, form libraries, etc.
        {...rest}
      />
    );
  }
);

// Optional: nice display name for React DevTools
TextInput.displayName = "TextInput";
