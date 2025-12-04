const express = require("express");
const router = express.Router();
const upload = require("../middleware/multerConfig");
const { uploadFile } = require("../controllers/fileController");
const {
  createUser,
  getUser,
  editUser,
  deleteUser,
  deleteAllUsers,
} = require("../controllers/userController");

// Upload file (single file with field name "file")
router.post("/upload", (req, res) => {
  upload.single("file")(req, res, (err) => {
    if (err) {
      console.log("Upload error handled:", err.message);
      return res.status(400).json({ success: false, message: err.message });
    }
    uploadFile(req, res);
  });
});

router.get("/test", (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Server Works",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/user", createUser);
router.get("/user", getUser);
router.patch("/user", editUser);
router.delete("/user", deleteUser);
router.delete("/users/all", deleteAllUsers);

module.exports = router;
