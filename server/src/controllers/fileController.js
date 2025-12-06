const path = require("path");
const fs = require("fs");
const {
  checkForFile,
  normalizeName,
  humanizeFileName,
} = require("../utils/utils");
const Document = require("../db/models/Document");
const User = require("../db/models/User");
const thumbnailGenerator = require("../utils/ThumbnailGenerator");
const uploadDir = path.join(__dirname, "../../uploads");

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

// const uploadFile = async (req, res) => {
//   const uid = req.body.uid;
//   const file = req.file;
//   console.log("inside uploadFile Function");
//   if (!uid) {
//     return res.status(400).json({ success: false, error: "No UID received" });
//   }

//   if (!file) {
//     return res.status(400).json({
//       success: false,
//       message: "No file received",
//     });
//   }
//   let thumbnail;
//   try {
//     // ONLY normalize for logging, not for logic
//     const normalizedName = normalizeName(file.originalname);

//     console.log("Normalized as:", normalizedName);

//     // Pass the real filename (with extension) to addToUser
//     // It will normalize it once
//     const savedFile = await addToUser(uid, file.originalname);
//     console.log("After Saved File");
//     const fileBaseName = path.parse(file.filename).name; // this matches the folder created by multer
//     console.log("After FileBase NAme");
//     console.error(`FILEBASENAME!!!!!!!!!!!!${fileBaseName}`);
//     try {
//       console.log("Before Thumbnail");
//       thumbnail = await thumbnailGenerator(uid, fileBaseName);
//       console.log(thumbnail.thumbnailPath);
//     } catch (err) {
//       return res.status(500).json({
//         success: false,
//         message: err.message,
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       // actual saved file on disk
//       message: `Saved as ${file.filename}`,
//       userID: uid,
//       path: file.path,
//       documentID: savedFile._id,
//       thumbnailPath: thumbnail.thumbnailPath,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };

const uploadFile = async (req, res) => {
  // Extract the user ID and the uploaded file from the request
  const uid = req.body.uid;
  const file = req.file;

  console.log("inside uploadFile Function"); // log entry into the function

  // Validate that a UID was provided
  if (!uid) {
    return res.status(400).json({
      success: false,
      error: "No UID received",
    });
  }

  // Validate that a file was uploaded
  if (!file) {
    return res.status(400).json({
      success: false,
      message: "No file received",
    });
  }

  // Declare the variable for thumbnail outside of try/catch so it is in scope for the response
  let thumbnail;

  try {
    // Normalize the file name for consistent logging and storage
    // Example: "Niñas.pdf" -> "ninias"
    const normalizedName = normalizeName(file.originalname);
    console.log("Normalized as:", normalizedName);

    // Save file info to the database
    // addToUser handles storing metadata about the uploaded file, including its normalized name
    const savedFile = await addToUser(uid, file.originalname);
    console.log("After Saved File");

    // Extract the base file name (without extension) from the file saved by Multer
    // This matches the folder created for the file storage
    const fileBaseName = path.parse(file.filename).name;
    console.log("After FileBaseName:", fileBaseName);

    // Log for debugging / monitoring
    console.log("Before Thumbnail");

    // Generate a thumbnail of the first page of the PDF
    // thumbnailGenerator reads the PDF from storage and creates a PNG in the same folder
    thumbnail = await thumbnailGenerator(uid, fileBaseName);
    console.log("Thumbnail generated at:", thumbnail.thumbnailPath);

    // Respond to the client with success
    // Includes paths to both the uploaded PDF and the generated thumbnail
    return res.status(200).json({
      success: true,
      message: `Saved as ${file.filename}`,
      userID: uid,
      path: file.path, // Path to the uploaded PDF on disk
      documentID: savedFile._id, // MongoDB document ID for reference
      thumbnailPath: thumbnail.thumbnailPath, // Path to the generated thumbnail PNG
    });
  } catch (err) {
    // Catch any errors that occur during DB save or thumbnail generation
    // Log the error for debugging
    console.error("Error in uploadFile:", err);

    // Respond with 500 to indicate a server error
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
  const { uid } = req.body;

  if (!uid) {
    return res.status(400).json({
      success: false,
      message: "No User ID Received",
    });
  }

  try {
    const userfiles = await Document.find({ ownerUID: uid });

    if (userfiles.length === 0) {
      return res.status(400).json({
        success: false,
        message: `User with id ${uid} has no stored files`,
      });
    }

    // Map the filenames to humanized versions and include thumbnail paths
    const humanizedFiles = userfiles.map((file) => {
      const fileBaseName = path.parse(file.documentName).name; // remove .pdf
      const fileFolder = path.join(
        __dirname,
        "../../uploads",
        uid,
        fileBaseName
      );
      const thumbnailPath = path.join(fileFolder, `${fileBaseName}-thumb.png`);

      // Check if thumbnail exists
      const thumbnailExists = fs.existsSync(thumbnailPath);

      return {
        ...file.toObject(),
        humanizedName: humanizeFileName(file.documentName),
        thumbnailPath
      };
    });

    return res.status(200).json({
      success: true,
      userFiles: humanizedFiles,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const selectFile = async (req, res) => {
  // Receive the file from the user's request
  const { uid, selectedFile } = req.body;
  console.log(uid, selectedFile);
  if (!uid || !selectedFile) {
    return res.status(400).json({
      success: false,
      message: `Incomplete Data Received uid=${uid}, selectedFile = ${selectedFile}`,
    });
  }
  console.log("After uid check");
  try {
    console.log("Inside try");
    // Check if the user has the file in the database
    const fileOnDB = await Document.findById(selectedFile);

    console.log(`File Path ${uploadDir}`);
    // Search the document storage for the file

    // Return an error if the file is not found

    // Return the Requested file
    return res.status(200).json({
      success: true,
      requestedFile: fileOnDB,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }

  // Catch any errors
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

const createThumbnail = async (req, res) => {
  const { uid, selectedFile } = req.body;
  try {
    console.log(selectedFile);
    const thumbnail = await thumbnailGenerator(uid, selectedFile);
    return res.status(200).json({
      success: true,
      thumbnail,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

module.exports = {
  createThumbnail,
  uploadFile,
  deleteFile,
  loadUserFiles,
  shareFile,
  loadSharedFiles,
  selectFile,
};
