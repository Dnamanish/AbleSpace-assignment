"use client";

import { useState } from "react";
import TaskBoard from "@/features/tasks/components/TaskBoard";
import TaskToolbar from "@/features/tasks/components/TaskToolbar";
import AddTaskModal from "@/features/tasks/components/AddTaskModal";
import type { Task } from "@/features/tasks/types";

export default function TasksPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [selectedStatus, setSelectedStatus] = useState("To Do");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");
  const [showPriority, setShowPriority] = useState(true);
  const [showDueDate, setShowDueDate] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [showMembers, setShowMembers] = useState(true);

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Write API Documentation",
      assignee: "Admin",
      date: "29 Jul",
      dueDate: "2026-07-29",
      tags: ["Deployment", "frontend"],
      status: "To Do",
      description: "",
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
      description: "",
      priority: "No Priority",
    },
    {
      id: 3,
      title: "Deploy to Production",
      assignee: "Admin",
      date: "29 Jul",
      dueDate: "2026-07-29",
      tags: ["Deployment", "Deployment"],
      status: "Completed",
      description: "",
      priority: "No Priority",
    },
  ]);

  const openModal = (status: string = "To Do") => {
    setSelectedStatus(status);
    setIsModalOpen(true);
  };

  const editTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const deleteTask = (id: number) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
  };

  const saveTask = (task: Task) => {
    setTasks((currentTasks) => {
      const exists = currentTasks.some(
        (currentTask) => currentTask.id === task.id,
      );

      if (exists) {
        return currentTasks.map((currentTask) =>
          currentTask.id === task.id ? task : currentTask,
        );
      }

      return [...currentTasks, task];
    });

    setEditingTask(null);
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesStatus =
      filterStatus === "All" || task.status === filterStatus;

    const matchesPriority =
      filterPriority === "All" || task.priority === filterPriority;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="p-4">
      <TaskToolbar
        onAddTask={() => openModal()}
        onSearch={setSearchQuery}

        onFilterStatus={setFilterStatus}
        onFilterPriority={setFilterPriority}

        onToggleMembers={() => setShowMembers((current) => !current)}
        onToggleDueDate={() => setShowDueDate((current) => !current)}
        onToggleLabels={() => setShowLabels((current) => !current)}
        
        showMembers={showMembers}
        showDueDate={showDueDate}
        showLabels={showLabels}
      />
      <TaskBoard
        tasks={filteredTasks}
        onAddTask={openModal}
        onDeleteTask={deleteTask}
        onEditTask={editTask}
        showMembers={showMembers}
        showDueDate={showDueDate}
        showLabels={showLabels}
      />

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSaveTask={saveTask}
        defaultStatus={selectedStatus}
        editingTask={editingTask}
      />
    </div>
  );
}
