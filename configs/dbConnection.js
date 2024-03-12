const mongoose = require("mongoose");
const CustomError = require("../errors/customError");

const connectionUrl = process.env?.MONGODB_URI;
const dbName = process.env?.DATABASE_NAME || "";

const mongooseConnection = async () => {
  try {
    if (!process.env?.MONGODB_URI)
      throw new CustomError("Mongodb connection string not found");
    await mongoose.connect(`${connectionUrl}`);
    console.log("*** DB Connected ***");
  } catch (error) {
    console.error("*** DB connection failed ***");

    throw new CustomError("*** DB connection failed ***");
  }
};

module.exports = mongooseConnection;
