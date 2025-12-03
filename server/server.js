const express = require("express");
const cors = require("cors");
const dotEnv = require("dotenv").config;
const morgan = require("morgan");
const app = express();

const PORT = process.env.PORT || 3003;
app.use(cors());
app.use(morgan("dev"));
const routes = require("./src/routes/index");
app.use("/api", routes);
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server Listening on port ${PORT}`);
});
