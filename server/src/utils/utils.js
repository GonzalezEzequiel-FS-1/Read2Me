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

const checkForFile = (filesInFolder, fileName) => {
  const fileExists = filesInFolder.includes(fileName);
  console.log(fileExists);
  return fileExists;
};

const normalizeName = (name) =>
  name
    .trim()
    .replace(/\.[^/.]+$/, "") // remove extension
    .normalize("NFD") // decompose accented characters
    .replace(/[\u0300-\u036f]/g, "") // remove diacritics, except for ñ
    .replace(/ç/g, "c") // optional: handle other special letters
    .toLowerCase()
    .replace(/\s+/g, "_") // replace spaces with underscores
    .replace(/[^a-z0-9_-ñ]/g, ""); // allow ñ explicitly

const humanizeFileName = (filename) => {
  // Remove extension if present
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");

  // Split by underscores (groups of underscores count as one space)
  const words = nameWithoutExt.split(/_+/);

  // Capitalize each word
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );

  // Join back with a single space
  return capitalizedWords.join(" ");
};
module.exports = {
  uploadFile,
  checkForFile,
  normalizeName,
  humanizeFileName,
};
