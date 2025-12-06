const { fromPath } = require("pdf2pic");
const path = require("path");
const fs = require("fs");

const thumbnailGenerator = async (uid, fileBaseName) => {
  try {
    console.log(
      `[Thumbnail] Starting generation for user: ${uid}, file: ${fileBaseName}`
    );

    const pdfFolder = path.join(__dirname, "../../uploads", uid, fileBaseName);
    const pdfPath = path.join(pdfFolder, `${fileBaseName}.pdf`);

    // Check if PDF exists
    if (!fs.existsSync(pdfPath)) {
      throw new Error(`[Thumbnail] PDF not found at ${pdfPath}`);
    }
    console.log(`[Thumbnail] Found PDF at ${pdfPath}`);

    const options = {
      density: 100,
      saveFilename: `${fileBaseName}-thumb`,
      savePath: pdfFolder,
      format: "png",
      width: 595,
      height: 842,
    };

    const convert = fromPath(pdfPath, options);

    console.log(`[Thumbnail] Converting page 1 to image...`);
    const page = await convert(1);
    console.log(`[Thumbnail] Page 1 converted successfully`);
    console.log(`[Thumbnail] ${fileBaseName}`);

    const thumbnailPath = path.join(pdfFolder, `${fileBaseName}-thumb.png`);
    console.log(`[Thumbnail] Thumbnail saved at ${thumbnailPath}`);

    return {
      success: true,
      thumbnailPath,
    };
  } catch (err) {
    console.error(`[Thumbnail] Error generating thumbnail: ${err.message}`);
    throw err;
  }
};

module.exports = thumbnailGenerator;
