const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: [
        "status",
        "priority",
        "date",
        "labels",
        "comment",
      ],
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: true,
  },
);

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
      enum: [
        "To Do",
        "Doing",
        "Completed",
        "On Hold",
      ],
      default: "To Do",
    },

    priority: {
      type: String,
      enum: [
        "No Priority",
        "Low",
        "Medium",
        "High",
      ],
      default: "No Priority",
    },

    activities: {
      type: [activitySchema],
      default: [],
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