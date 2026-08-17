"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Task } from "./types";

type TaskContextType = {
  tasks: Task[];
  saveTask: (task: Task) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
};

const TaskContext = createContext<TaskContextType | null>(null);

const API_URL = "http://localhost:5000/api/tasks";

export function TaskProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load tasks
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const response = await fetch(API_URL, {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }

        const data = await response.json();

        setTasks(data);
      } catch (error) {
        console.error("Failed to load tasks:", error);
      }
    };

    loadTasks();
  }, []);

  // Create or update task
  const saveTask = async (task: Task) => {
    try {
      const exists = tasks.some(
        (currentTask) => currentTask.id === task.id,
      );

      // UPDATE
      if (exists) {
        const response = await fetch(`${API_URL}/${task.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(task),
        });

        if (!response.ok) {
          throw new Error("Failed to update task");
        }

        const updatedTask = await response.json();

        setTasks((currentTasks) =>
          currentTasks.map((currentTask) =>
            currentTask.id === task.id ? updatedTask : currentTask,
          ),
        );

        return;
      }

      // CREATE
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        throw new Error("Failed to create task");
      }

      const createdTask = await response.json();

      setTasks((currentTasks) => [...currentTasks, createdTask]);
    } catch (error) {
      console.error("Failed to save task:", error);
    }
  };

  // Delete task
  const deleteTask = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== id),
      );
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  // Update task
  const updateTask = async (
    id: string,
    updates: Partial<Task>,
  ) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      const updatedTask = await response.json();

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === id ? updatedTask : task,
        ),
      );
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        saveTask,
        deleteTask,
        updateTask,
      }}
    >
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