const multer = require("multer");
const fs = require("fs");
const path = require("path");


const testRoute = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Server Works",
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

const uploadFile = (req, res) => {
  const uid = req.body.uid;
  const file = req.file;
  if (!uid) {
    return res.status(400).json({
      success: false,
      error: "No UID Received",
    });
  }
  if (!file) {
    return res
      .status(400)
      .json({ success: false, message: "No file received" });
  }
  
  console.log("File saved:", file.path);
  res.status(200).json({
    success: true,
    message: `Saved as ${file.originalname}`,
    userID: uid,
  });
};

module.exports = {
  testRoute,
  uploadFile,
};
