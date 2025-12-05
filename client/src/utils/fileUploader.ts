import axios from "axios";

interface User {
  uid: string;
  key: string; // optional if the user object has more properties
}

type ServerMessageSetter = (msg: string) => void;
type ServerMessageTypeSetter = (type: "success" | "error") => void;

interface UploadResponse {
  message?: string;
  key: string;
}

export const handleUpload = async (
  file: File | null,
  user: User | null,
  DBURL: string,
  setServerMessage: ServerMessageSetter,
  setServerMessageType: ServerMessageTypeSetter
): Promise<void> => {
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

  const ext = file.name.split(".").pop() ?? "pdf"; // fallback if no extension
  const safeFile = new File([file], `${normalizedFileName}.${ext}`, {
    type: file.type,
  });

  const formData = new FormData();
  formData.append("file", safeFile);
  formData.append("uid", user.uid);

  try {
    const response = await axios.post<UploadResponse>(
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
  } catch (err: unknown) {
    if (err instanceof Error) {
      setServerMessage(err.message || "Upload failed");
    } else {
      setServerMessage("Upload failed");
    }
    setServerMessageType("error");
  }
};
