import React, { useState } from "react";
import axios from "axios";
import { Button } from "@mantine/core";
import { getAuth } from "firebase/auth";

const APIURL = "http://localhost:3003/api/upload";

export const UploadComponent = () => {
  const [file, setFile] = useState(null);
  const [serverMessage, setServerMessage] = useState("");
  const [serverMessageType, setServerMessageType] = useState("success");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log("File selected:", selectedFile);
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      console.log("No user logged in");
      setServerMessage("No user logged in");
      setServerMessageType("error");
      return;
    }

    if (!file) {
      console.log("No file selected");
      setServerMessage("No file selected");
      setServerMessageType("error");
      return;
    }

    const uid = currentUser.uid;
    console.log("Starting upload for UID:", uid);
    console.log("File:", file);

    // Normalize file name
    const normalizedFileName = file.name
      .trim()
      .replace(/\.[^/.]+$/, "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/[^a-z0-9_-]/g, "");

    const ext = file.name.split(".").pop() || "pdf";
    const safeFile = new File([file], `${normalizedFileName}.${ext}`, {
      type: file.type,
    });

    const formData = new FormData();
    formData.append("file", safeFile);

    console.log("FormData prepared:", Array.from(formData.entries()));

    try {
      const response = await axios.post(`${APIURL}?uid=${uid}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Response received:", response);

      if (response.status === 200) {
        setServerMessage(response.data.message || "Upload successful");
        setServerMessageType("success");
      } else {
        setServerMessage(response.data.message || "Upload failed");
        setServerMessageType("error");
      }
    } catch (err) {
      console.log("Upload error caught:", err);
      const message = err?.message || "Upload failed";
      setServerMessage(message);
      setServerMessageType("error");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <Button onClick={handleUpload}>Upload</Button>
      {serverMessage && (
        <p style={{ color: serverMessageType === "success" ? "green" : "red" }}>
          {serverMessage}
        </p>
      )}
    </div>
  );
};
