"use client";

import { useState } from "react";
import TaskBoard from "@/features/tasks/components/TaskBoard";
import TaskToolbar from "@/features/tasks/components/TaskToolbar";
import AddTaskModal from "@/features/tasks/components/AddTaskModal";
import type { Task } from "@/features/tasks/types";

export default function TasksPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Write API Documentation",
      assignee: "Admin",
      date: "29 Jul",
      tags: ["Deployment", "Deployment"],
      status: "To Do",
    },
    {
      id: 2,
      title: "Implement Search Function",
      assignee: "Admin",
      date: "29 Jul",
      tags: ["Deployment", "Deployment"],
      status: "Doing",
    },
    {
      id: 3,
      title: "Deploy to Production",
      assignee: "Admin",
      date: "29 Jul",
      tags: ["Deployment", "Deployment"],
      status: "Completed",
    },
  ]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addTask = (task: Task) => {
    setTasks((currentTasks) => [...currentTasks, task]);
  };
  return (
    <div className="p-4">
      <TaskToolbar onAddTask={openModal} />
      <TaskBoard tasks={tasks} onAddTask={openModal} />

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onAddTask={addTask}
      />
    </div>
  );
}
