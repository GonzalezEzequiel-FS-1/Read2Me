const uploadFile = async (req, res) => {
  const file = req.file;
  if (!file) {
    console.log("No File Received");
    return res
      .status(400)
      .json({ success: false, message: "File not received" });
  }

  console.log("Received file:", file.originalname);
  return res.status(200).json({ success: true, file: file.originalname });
};

module.exports = {
  uploadFile,
};
