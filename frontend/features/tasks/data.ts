import type { Task } from "./types";

export const initialTasks: Task[] = [
  {
    id: 1,
    title: "Write API Documentation",
    assignee: "Admin",
    date: "29 Jul",
    dueDate: "2026-07-29",
    tags: ["Deployment", "frontend"],
    status: "To Do",
    description:
      "Create clear and detailed API documentation to guide developers in using the inventory and sales metrics features effectively.",
    priority: "No Priority",
  },
  {
    id: 2,
    title: "Implement Search Function",
    assignee: "Admin",
    date: "29 Jul",
    dueDate: "2026-07-29",
    tags: ["Bug", "Deployment"],
    status: "Doing",
    description: "Implement the search functionality.",
    priority: "High",
  },
  {
    id: 3,
    title: "Deploy to Production",
    assignee: "Admin",
    date: "29 Jul",
    dueDate: "2026-07-29",
    tags: ["Deployment"],
    status: "Completed",
    description: "Deploy the application to production.",
    priority: "Medium",
  },
];