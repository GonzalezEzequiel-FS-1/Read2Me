import axios from "axios";

const handleUpload = async (
  file,
  user,
  DBURL,
  setServerMessage,
  setServerMessageType
) => {
  if (!file || !user?.uid) return;

  // Normalize the file name
  const normalizedFileName = file.name
    .trim()
    .replace(/\.[^/.]+$/, "") // remove extension
    .normalize("NFD") // decompose accented chars
    .replace(/[\u0300-\u036f]/g, "") // remove diacritics
    .toLowerCase()
    .replace(/\s+/g, "_") // replace spaces
    .replace(/[^a-z0-9_-]/g, ""); // remove any other unsafe characters

  const ext = file.name.split(".").pop() || "pdf"; // fallback if no extension
  const safeFile = new File([file], `${normalizedFileName}.${ext}`, {
    type: file.type,
  });

  const formData = new FormData();
  formData.append("file", safeFile);
  formData.append("uid", user.uid);

  try {
    const response = await axios.post(
      `${DBURL}/upload?uid=${user.uid}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        validateStatus: (status) => status < 500,
      }
    );

    if (response.status === 200) {
      setServerMessage(response.data.message || "Upload successful");
      setServerMessageType("success");
    } else {
      setServerMessage(response.data.message || "Upload failed");
      setServerMessageType("error");
    }
  } catch (err) {
    const message = err?.message || "Upload failed"; // handles plain errors
    setServerMessage(message);
    setServerMessageType("error");
  }
};
