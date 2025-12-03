const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    try {
      const filePath = path.join(uploadDir, file.originalname);
      if (fs.existsSync(filePath)) {
        // Pass error to cb without logging
        cb(new Error("File already exists"));
      } else {
        cb(null, file.originalname);
      }
    } catch (err) {
      cb(err);
    }
  },
});

const upload = multer({ storage });

module.exports = upload;
