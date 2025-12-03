import {
  Delete,
  FileUploadRounded,
  FileUploadTwoTone,
  Save,
  TextSnippet,
} from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import axios from "axios";
import { useCallback, useContext, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AuthContext } from "../Context/ContextDeclaration/AuthContext";

const DBURL = "http://localhost:3003/api";

export const FileUploader = () => {
  const { user } = useContext(AuthContext);

  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [serverMessage, setServerMessage] = useState("");
  const [serverMessageType, setServerMessageType] = useState<
    "success" | "error"
  >("success");

  // Handle file drop
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setServerMessage("");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const clearFile = () => {
    setFile(null);
    setFileName("");
    setServerMessage("");
  };

  // Upload file
  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    if (user?.uid) formData.append("uid", user.uid);

    try {
      const response = await axios.post(`${DBURL}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        validateStatus: (status) => status < 500, // treat 400 as "success" so it doesn’t throw
      });

      if (response.status === 200) {
        setServerMessage(response.data.message || "Upload successful");
        setServerMessageType("success");
      } else {
        setServerMessage(response.data.message || "Upload failed");
        setServerMessageType("error");
      }
    } catch (err: any) {
      setServerMessage(err.message || "Upload failed");
      setServerMessageType("error");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {!fileName ? (
        <Box sx={{ display: "flex", gap: 2 }}>
          <IconButton {...getRootProps()}>
            <input {...getInputProps()} />
            {!isDragActive ? <FileUploadTwoTone /> : <FileUploadRounded />}
          </IconButton>
          <IconButton onClick={handleUpload}>
            <TextSnippet />
          </IconButton>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <Typography>{fileName}</Typography>
          <IconButton onClick={handleUpload}>
            <Save />
          </IconButton>
          <IconButton onClick={clearFile}>
            <Delete />
          </IconButton>
        </Box>
      )}

      {serverMessage && (
        <Typography
          variant="body2"
          sx={{
            mt: 1,
            color: serverMessageType === "success" ? "green" : "red",
          }}
        >
          {serverMessage}
        </Typography>
      )}
    </Box>
  );
};
