const mongoose = require("mongoose");
const DBURL = process.env.DBURL;

const dbConnection = async () => {
  try {
    await mongoose.connect(DBURL);
    console.log("Database connected");
  } catch (error) {
    console.error("Unable to connect to Database", error);
  }
};
module.exports = {
  dbConnection,
};
