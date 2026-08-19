const Task = require("../models/Task");

const formatTask = (task) => ({
  id: task._id.toString(),

  title: task.title,

  description: task.description,

  assignee: task.assignee,

  date: task.date,

  dueDate: task.dueDate,

  tags: task.tags,

  status: task.status,

  priority: task.priority,

  activities: task.activities || [],
});

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      userId: req.user.userId,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json(
      tasks.map(formatTask),
    );
  } catch (error) {
    console.error(
      "Get tasks error:",
      error,
    );

    res.status(500).json({
      message: "Failed to fetch tasks",
    });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,

      userId: req.user.userId,

      activities: [],
    });

    res.status(201).json(
      formatTask(task),
    );
  } catch (error) {
    console.error(
      "Create task error:",
      error,
    );

    res.status(500).json({
      message: "Failed to create task",
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    const activities = [];

    /*
     * STATUS
     */
    if (
      req.body.status !== undefined &&
      req.body.status !== task.status
    ) {
      activities.push({
        type: "status",

        message:
          `You changed status from ${task.status} to ${req.body.status}`,

        createdAt: new Date(),
      });
    }

    /*
     * PRIORITY
     */
    if (
      req.body.priority !== undefined &&
      req.body.priority !== task.priority
    ) {
      activities.push({
        type: "priority",

        message:
          `You changed priority from ${task.priority} to ${req.body.priority}`,

        createdAt: new Date(),
      });
    }

    /*
     * DUE DATE
     */
    if (
      req.body.dueDate !== undefined &&
      req.body.dueDate !== task.dueDate
    ) {
      const oldDate = task.dueDate
        ? formatActivityDate(task.dueDate)
        : "No date";

      const newDate = req.body.dueDate
        ? formatActivityDate(req.body.dueDate)
        : "No date";

      activities.push({
        type: "date",

        message:
          `You changed due date from ${oldDate} to ${newDate}`,

        createdAt: new Date(),
      });
    }

    /*
     * LABELS
     */
    if (
      req.body.tags !== undefined &&
      JSON.stringify(req.body.tags) !==
        JSON.stringify(task.tags)
    ) {
      const oldTags =
        task.tags.length > 0
          ? task.tags.join(", ")
          : "No labels";

      const newTags =
        req.body.tags.length > 0
          ? req.body.tags.join(", ")
          : "No labels";

      activities.push({
        type: "labels",

        message:
          `You changed labels from ${oldTags} to ${newTags}`,

        createdAt: new Date(),
      });
    }

    /*
     * Update task fields
     */
    Object.keys(req.body).forEach((key) => {
      if (key !== "activities") {
        task[key] = req.body[key];
      }
    });

    /*
     * Add new activities
     */
    if (activities.length > 0) {
      task.activities.push(
        ...activities,
      );
    }

    await task.save();

    res.status(200).json(
      formatTask(task),
    );
  } catch (error) {
    console.error(
      "Update task error:",
      error,
    );

    res.status(500).json({
      message: "Failed to update task",
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task =
      await Task.findOneAndDelete({
        _id: req.params.id,

        userId: req.user.userId,
      });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      message:
        "Task deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete task error:",
      error,
    );

    res.status(500).json({
      message: "Failed to delete task",
    });
  }
};

/*
 * Convert:
 *
 * 2026-08-20
 *
 * into:
 *
 * Aug 20, 2026
 */
const formatActivityDate = (
  dateString,
) => {
  const parts = dateString.split("-");

  if (parts.length !== 3) {
    return dateString;
  }

  const date = new Date(
    Number(parts[0]),
    Number(parts[1]) - 1,
    Number(parts[2]),
  );

  return date.toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    },
  );
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};