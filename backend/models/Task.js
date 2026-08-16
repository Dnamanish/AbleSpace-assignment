const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    assignee: {
      type: String,
      default: "Admin",
    },

    date: {
      type: String,
      default: "",
    },

    dueDate: {
      type: String,
      default: "",
    },

    tags: {
      type: [String],
      default: [],
    },

    status: {
      type: String,
      enum: ["To Do", "Doing", "Completed", "On Hold"],
      default: "To Do",
    },

    priority: {
      type: String,
      enum: ["No Priority", "Low", "Medium", "High"],
      default: "No Priority",
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;