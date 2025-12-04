const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// TODO MAKE SURE IT CAN HANDLE Special Characters Ex Niñas gets saved as ninias on the server and nini as on the document storage
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"), false);
  }
};

const { normalizeName } = require("../utils/utils");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uid = req.query.uid;
    if (!uid) return cb(new Error("No UID provided"));

    const userDir = path.join(uploadDir, uid);
    if (!fs.existsSync(userDir)) fs.mkdirSync(userDir, { recursive: true });

    cb(null, userDir);
  },
  filename: (req, file, cb) => {
    try {
      // Use the normalizeName utility to create consistent filenames
      const safeName =
        normalizeName(file.originalname) + path.extname(file.originalname);

      const filePath = path.join(uploadDir, req.query.uid, safeName);
      if (fs.existsSync(filePath)) {
        cb(new Error("File already exists"));
      } else {
        cb(null, safeName);
      }
    } catch (err) {
      cb(err);
    }
  },
});

const upload = multer({ storage, fileFilter });

module.exports = upload;
