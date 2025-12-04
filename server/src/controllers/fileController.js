const path = require("path");
const fs = require("fs");
const {
  checkForFile,
  normalizeName,
  humanizeFileName,
} = require("../utils/utils");
const Document = require("../db/models/Document");
const User = require("../db/models/User");
const uploadDir = path.join(__dirname, "../uploads");

const addToUser = async (uid, filename) => {
  // Normalize once here
  const normalizedName = normalizeName(filename);

  // Check if the user already has a document with this name
  const fileExists = await Document.findOne({
    documentName: normalizedName,
    ownerUID: uid,
  });

  if (fileExists) {
    throw new Error(`File with name ${filename} already exists for this user`);
  }

  // Create the document entry
  const savedFile = await Document.create({
    documentName: normalizedName, // stored without extension
    ownerUID: uid,
  });

  // Add the document reference to the user
  await User.findOneAndUpdate({ uid }, { $push: { userFiles: savedFile._id } });

  return savedFile;
};

const uploadFile = async (req, res) => {
  const uid = req.body.uid;
  const file = req.file;

  if (!uid) {
    return res.status(400).json({ success: false, error: "No UID received" });
  }

  if (!file) {
    return res.status(400).json({
      success: false,
      message: "No file received",
    });
  }

  try {
    // ONLY normalize for logging, not for logic
    const normalizedName = normalizeName(file.originalname);

    console.log("Normalized as:", normalizedName);

    // Pass the real filename (with extension) to addToUser
    // It will normalize it once
    const savedFile = await addToUser(uid, file.originalname);

    return res.status(200).json({
      success: true,
      // actual saved file on disk
      message: `Saved as ${file.filename}`,
      userID: uid,
      path: file.path,
      documentID: savedFile._id,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteFile = async (req, res) => {
  const fileName = req.query.fileName;

  if (!fileName) {
    return res.status(400).json({
      success: false,
      message: "No File Name Received",
    });
  }

  const normalizedName = normalizeName(fileName);

  try {
    // Delete from database
    const dbDeletion = await Document.findOneAndDelete({
      documentName: normalizedName,
    });

    // Error deleting document from DB
    if (!dbDeletion) {
      return res.status(400).json({
        success: false,
        message: `Document ${fileName} not found in database.`,
      });
    }

    // Delete document from user's list
    await User.findOneAndUpdate(
      { uid: dbDeletion.ownerUID },
      { $pull: { userFiles: dbDeletion._id } }
    );

    // Delete from local filesystem
    const folderPath = path.join(uploadDir, dbDeletion.ownerUID);
    const filePath = path.join(folderPath, `${fileName}.pdf`);

    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
    } else {
      console.warn(`File ${filePath} not found on disk.`);
    }

    return res.status(200).json({
      success: true,
      message: `File with name: ${fileName} deleted.`,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const loadUserFiles = async (req, res) => {
  const uid = req.body.uid;
  console.log(`Inside Load User Files function with uid: ${uid}`);
  if (!uid) {
    return res.status(400).json({
      success: false,
      message: "No User ID Received",
    });
  }
  console.log("After UID Check");

  try {
    console.log("inside loadUserFiles try/catch");
    const userfiles = await Document.find({ ownerUID: uid });
    console.log(userfiles);

    if (userfiles.length === 0) {
      console.log("Inside userfiles.length if");
      return res.status(400).json({
        success: false,
        message: `User with id ${uid} has no stored files`,
      });
    }

    // Map the filenames to humanized versions
    const humanizedFiles = userfiles.map((file) => ({
      ...file.toObject(), // include other properties if needed
      humanizedName: humanizeFileName(file.documentName),
    }));

    return res.status(200).json({
      success: true,
      files: humanizedFiles,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const shareFile = async (req, res) => {
  const { ownerUID, sharedUID, docID } = req.body;

  if (!ownerUID || !sharedUID || !docID) {
    return res.status(400).json({ success: false, message: "Incomplete data" });
  }

  try {
    const document = await Document.findOne({ _id: docID, ownerUID });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found or not owned by you",
      });
    }

    // Only add if not already shared
    if (!document.sharedUIDs.includes(sharedUID)) {
      document.sharedUIDs.push(sharedUID);
      await document.save();
    }

    return res
      .status(200)
      .json({ success: true, message: "File shared successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const loadSharedFiles = async (req, res) => {
  const { uid } = req.query;

  if (!uid) {
    return res.status(400).json({ success: false, message: "No UID provided" });
  }

  try {
    const sharedFiles = await Document.find({ sharedUIDs: uid });
    return res.status(200).json({ success: true, sharedFiles });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  uploadFile,
  deleteFile,
  loadUserFiles,
  shareFile,
  loadSharedFiles,
};
