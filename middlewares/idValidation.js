"use strict";

const mongoose = require("mongoose");
const CustomError = require("../errors/customError");

module.exports = (req, res, next) => {
  const isValid = mongoose.isValidObjectId(req.params.todoId);
  if (!isValid) throw new CustomError("ID is not valid", 400);
  next();
};
