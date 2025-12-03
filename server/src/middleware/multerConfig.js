const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Make sure the uploads folder exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Optionally append timestamp if file exists
    const filePath = path.join(uploadDir, file.originalname);
    if (fs.existsSync(filePath)) {
      console.log("file exists");
      cb(new Error("File already exists"));
    } else {
      cb(null, file.originalname);
    }
  },
});

const upload = multer({ storage });

module.exports = upload;
