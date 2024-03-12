"use strict";

const mongoose = require("mongoose");
const { Schema, models, model } = mongoose;

const PRIORITIES = {
  LOW: "low",
  NORMAL: "normal",
  HIGH: "high",
};

const TodoSchema = Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    isDone: { type: Boolean, default: false },
    priority: {
      type: String,

      enum: {
        values: Object.values(PRIORITIES),
        message: "low, normal, high could be selected",
      },
      default: "normal",
    },
  },
  { collection: "todo", timestamps: true }
);

TodoSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    ret.createdAt =
      ret.createdAt.toLocaleDateString("tr-TR") +
      "-" +
      ret.createdAt.toLocaleTimeString("tr-TR", {
        hour: "2-digit",
        minute: "2-digit",
      });
    ret.updatedAt =
      ret.updatedAt.toLocaleDateString("tr-TR") +
      "-" +
      ret.updatedAt.toLocaleTimeString("tr-TR", {
        hour: "2-digit",
        minute: "2-digit",
      });
  },
});

const Todo = models.Todo || model("Todo", TodoSchema);

module.exports = Todo;
