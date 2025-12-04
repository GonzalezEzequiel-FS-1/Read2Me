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
import { handleUpload } from "../utils/fileUploader";

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

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      accept: {
        "application/pdf": [".pdf"],
      },
    });

  const clearFile = () => {
    setFile(null);
    setFileName("");
    setServerMessage("");
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
          <IconButton
            onClick={() =>
              handleUpload(
                file,
                user,
                DBURL,
                setServerMessage,
                setServerMessageType
              )
            }
          >
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
          <IconButton
            onClick={() =>
              handleUpload(
                file,
                user,
                DBURL,
                setServerMessage,
                setServerMessageType
              )
            }
          >
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
      {fileRejections.length > 0 && (
        <Box sx={{ mt: 1 }}>
          {fileRejections.map(({ file, errors }) => (
            <Box key={file.name}>
              <Typography color="error">{file.name} was rejected:</Typography>
              {errors.map((e) => (
                <Typography key={e.code} color="error" variant="body2">
                  {e.message}
                </Typography>
              ))}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};
