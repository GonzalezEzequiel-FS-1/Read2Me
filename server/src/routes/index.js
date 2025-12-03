const express = require("express");
const router = express.Router();
const upload = require("../middleware/multerConfig");
const { uploadFile } = require("../controllers/fileController");

// Upload file (single file with field name "file")
router.post("/upload", upload.single("file"), uploadFile);

module.exports = router;
