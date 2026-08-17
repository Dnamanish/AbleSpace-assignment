const Project = require("../models/Project");

const formatProject = (project) => ({
  id: project._id.toString(),
  name: project.name,
  priority: project.priority,
  lead: project.lead,
  dueDate: project.dueDate,
});

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      userId: req.user.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json(projects.map(formatProject));
  } catch (error) {
    console.error("Get projects error:", error);

    res.status(500).json({
      message: "Failed to fetch projects",
    });
  }
};

const createProject = async (req, res) => {
  try {
    const project = await Project.create({
      ...req.body,
      userId: req.user.userId,
    });

    res.status(201).json(formatProject(project));
  } catch (error) {
    console.error("Create project error:", error);

    res.status(500).json({
      message: "Failed to create project",
    });
  }
};

const updateProject = async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.userId,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.status(200).json(formatProject(project));
  } catch (error) {
    console.error("Update project error:", error);

    res.status(500).json({
      message: "Failed to update project",
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.status(200).json({
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Delete project error:", error);

    res.status(500).json({
      message: "Failed to delete project",
    });
  }
};

module.exports = {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
};