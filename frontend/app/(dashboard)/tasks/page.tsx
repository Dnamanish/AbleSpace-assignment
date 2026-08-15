"use client";

import { useState } from "react";
import TaskBoard from "@/features/tasks/components/TaskBoard";
import TaskToolbar from "@/features/tasks/components/TaskToolbar";
import AddTaskModal from "@/features/tasks/components/AddTaskModal";
import type { Task } from "@/features/tasks/types";
import TaskList from "@/features/tasks/components/TaskList";
import { initialTasks } from "@/features/tasks/data";
import { useTasks } from "@/features/tasks/TaskProvider";

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
  const [viewMode, setViewMode] = useState<"board" | "list">("board");
  // const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const { tasks, saveTask, deleteTask } = useTasks();

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

  // const deleteTask = (id: number) => {
  //   setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
  // };

  // const saveTask = (task: Task) => {
  //   setTasks((currentTasks) => {
  //     const exists = currentTasks.some(
  //       (currentTask) => currentTask.id === task.id,
  //     );

  //     if (exists) {
  //       return currentTasks.map((currentTask) =>
  //         currentTask.id === task.id ? task : currentTask,
  //       );
  //     }

  //     return [...currentTasks, task];
  //   });

  //   setEditingTask(null);
  // };
  const handleSaveTask = (task: Task) => {
    saveTask(task);
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
        onChangeView={setViewMode}
        viewMode={viewMode}
      />
      {viewMode === "board" ? (
        <TaskBoard
          tasks={filteredTasks}
          onAddTask={openModal}
          onDeleteTask={deleteTask}
          onEditTask={editTask}
          showMembers={showMembers}
          showDueDate={showDueDate}
          showLabels={showLabels}
        />
      ) : (
        <TaskList
          tasks={filteredTasks}
          onAddTask={openModal}
          onDeleteTask={deleteTask}
          onEditTask={editTask}
          showMembers={showMembers}
          showDueDate={showDueDate}
          showLabels={showLabels}
        />
      )}

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSaveTask={handleSaveTask}
        defaultStatus={selectedStatus}
        editingTask={editingTask}
      />
    </div>
  );
}
