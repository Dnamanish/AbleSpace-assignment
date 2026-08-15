"use client";

import { createContext, useContext, useState } from "react";
import type { Task } from "./types";
import { initialTasks } from "./data";

type TaskContextType = {
  tasks: Task[];
  saveTask: (task: Task) => void;
  deleteTask: (id: number) => void;
  updateTask: (id: number, updates: Partial<Task>) => void;
};

const TaskContext = createContext<TaskContextType | null>(null);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

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
  };

  const deleteTask = (id: number) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
  };

  const updateTask = (id: number, updates: Partial<Task>) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, ...updates } : task,
      ),
    );
  };

  return (
    <TaskContext.Provider value={{ tasks, saveTask, deleteTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTasks must be used inside TaskProvider");
  }

  return context;
}
