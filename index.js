"use strict";

require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const mongooseConnection = require("./configs/dbConnection");
const cors = require("cors");
const HOST = process.env?.HOST || "127.0.0.1";
const PORT = process.env?.PORT || 8000;

app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

(async () => {
  await mongooseConnection();
  app.use("/todo", require("./routes/todoRoute"));
  app.all("*", (req, res) => {
    res.status(404).send(`${req.method} ${req.path} not found`);
  });
  app.use(require("./middlewares/errorHandler"));
  app.listen(PORT, HOST, () => {
    console.log(`Listening http://${HOST}:${PORT}`);
  });
})();
