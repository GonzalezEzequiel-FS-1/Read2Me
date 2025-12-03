const multer = require("multer");
const fs = require("fs");
const path = require("path");

const testRoute = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Server Works",
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

module.exports = {
  testRoute,
};
