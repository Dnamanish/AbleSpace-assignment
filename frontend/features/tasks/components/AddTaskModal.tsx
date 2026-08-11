"use client";

import { useState } from "react";
import { Task } from "../types";

type AddTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (task: Task) => void;
};

export default function AddTaskModal({
  isOpen,
  onClose,
  onAddTask,
}: AddTaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To Do");
  const [priority, setPriority] = useState("No Priority");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = () => {
    const newTask: Task = {
      id: Date.now(),
      title,
      description,
      assignee: "Admin",
      date: new Date(dueDate).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
      }),
      tags: [],
      status,
      priority,
    };

    onAddTask(newTask);

    setTitle("");
    setDescription("");
    setStatus("To Do");
    setPriority("No Priority");
    setDueDate("");

    onClose();
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-[560px] rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-5">
          <h2 className="text-xl font-semibold">Add Task</h2>

          <button
            type="button"
            onClick={onClose}
            className="text-xl text-gray-500"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <div className="space-y-5 p-6">
          {/* Title */}
          <div>
            <label className="mb-2 block text-sm">Title *</label>

            <input
              type="text"
              placeholder="What needs to be done?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-md border px-3 py-3 outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm">Description</label>

            <textarea
              placeholder="Add a description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-24 w-full resize-none rounded-md border px-3 py-3 outline-none"
            />
          </div>

          {/* Status + Priority */}
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="mb-2 block text-sm">Status</label>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded-md border px-3 py-3"
              >
                <option>To Do</option>
                <option>Doing</option>
                <option>Completed</option>
                <option>On Hold</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm">Priority</label>

              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full rounded-md border px-3 py-3"
              >
                <option>No Priority</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label className="mb-2 block text-sm">Due Date</label>

            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full rounded-md border px-3 py-3"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-4 border-t px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-lg bg-black px-5 py-2 text-sm text-white"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
}
