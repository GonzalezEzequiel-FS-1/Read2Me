const express = require("express");
const cors = require("cors");
require("dotenv").config();
const morgan = require("morgan");
const { dbConnection } = require("./src/db/connection/dbConnection");
const app = express();
app.use(express.json());

const PORT = process.env.PORT;
app.use(cors());
app.use(morgan("dev"));
const routes = require("./src/routes/index");

app.use("/api", routes);

dbConnection();

app.listen(PORT, () => {
  console.log(`Server Listening on port ${PORT}`);
});
