const path = require("path");

const uploadFile = (req, res) => {
  const uid = req.body.uid;
  const file = req.file;

  if (!uid) {
    console.log("No UID");
    return res.status(400).json({ success: false, error: "No UID received" });
  }

  if (!file) {
    // This happens if Multer throws an error (e.g., file exists)
    console.log("No File");
    return res.status(400).json({
      success: false,
      message: "No file received",
    });
  }

  const filePath = file.path;
  console.log(`File saved: ${filePath}, User UID: ${uid}`);
  try {
    return res.status(200).json({
      success: true,
      message: `Saved as ${file.filename}`,
      userID: uid,
      path: filePath,
    });
  } catch (err) {
    console.log("In Error Block");
    return;
  }
};

module.exports = { uploadFile };
