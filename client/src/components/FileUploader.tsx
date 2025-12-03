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

  // Handle file drop
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // Clear selected file
  const clearFile = () => {
    setFile(null);
    setFileName("");
    setServerMessage("");
  };

  // Upload file
  const handleUpload = async () => {
    if (!file) {
      console.log("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    if (user?.uid) {
      formData.append("uid", user.uid);
    }

    try {
      const response = await axios.post(`${DBURL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Upload success:", response.data);
      setServerMessage(response.data.message || "Upload successful");
    } catch (err: any) {
      console.error("Upload error:", err);

      if (err.response && err.response.data && err.response.data.message) {
        setServerMessage(err.response.data.message); // e.g., "File already exists"
      } else {
        setServerMessage(err.message || "Upload failed");
      }
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
        <Typography variant="body2" sx={{ mt: 1, color: "green" }}>
          {serverMessage}
        </Typography>
      )}
    </Box>
  );
};
