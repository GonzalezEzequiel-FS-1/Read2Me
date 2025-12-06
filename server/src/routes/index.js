const express = require("express");
const router = express.Router();
const upload = require("../middleware/multerConfig");
const {
  uploadFile,
  deleteFile,
  loadUserFiles,
  loadSharedFiles,
  shareFile,
  selectFile,
  createThumbnail,
} = require("../controllers/fileController");
const {
  createUser,
  getUser,
  editUser,
  deleteUser,
  deleteAllUsers,
  toggleProfileVisibility,
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

// router.get("/test", (req, res) => {
//   try {
//     return res.status(200).json({
//       success: true,
//       message: "Server Works",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

// User routes
router
  .route("/user")
  .post(createUser)
  .get(getUser)
  .patch(editUser)
  .delete(deleteUser);

router.delete("/users/all", deleteAllUsers);

// File routes
router.route("/file/share").get(loadSharedFiles).patch(shareFile);

router.route("/file").delete(deleteFile).get(selectFile);

router.get("/file/all", loadUserFiles);

// Toggle Visibility
router.patch("/user/visibility", toggleProfileVisibility);

router.get("/thumbnail", createThumbnail);

// Add a friend
//router.patch("/user/contact", addContact);

module.exports = router;
