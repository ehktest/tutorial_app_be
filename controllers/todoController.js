"use strict";

const CustomError = require("../errors/customError");
const Todo = require("../models/todoModel");
const mongoose = require("mongoose");

module.exports = {
  list: async (req, res) => {
    const todos = await Todo.find({});
    res.status(200).json({ error: false, result: todos });
  },

  read: async (req, res) => {
    const isValid = mongoose.isValidObjectId(req.params.todoId);
    if (!isValid) throw new CustomError("ID is not valid", 400);

    const todo = await Todo.findOne({ _id: req.params.todoId });
    res.status(200).json({ error: false, result: todo });
  },
  create: async (req, res) => {
    const newTodo = await Todo.create(req.body);
    res.status(201).json({ error: false, result: newTodo });
  },

  update: async (req, res) => {
    const updatedTodo = await Todo.updateOne(
      { _id: req.params.todoId },
      req.body,
      { runValidators: true }
    );
    res.status(202).json({
      error: false,
      body: req.body,
      result: updatedTodo,
      new: await Todo.findById(req.params.todoId),
    });
  },
  destroy: async (req, res) => {
    const deletedTodo = await Todo.deleteOne({ _id: req.params.todoId });
    if (!deletedTodo.deletedCount) throw new CustomError("Not deleted", 409);
    res.status(200).json({
      error: false,
      result: deletedTodo,
    });
  },
};
