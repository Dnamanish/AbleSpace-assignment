"use client";

import { useState, useEffect } from "react";
import { Task } from "../types";

type AddTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSaveTask: (task: Task) => void;
  defaultStatus: string;
  editingTask: Task | null;
};

export default function AddTaskModal({
  isOpen,
  onClose,
  onSaveTask,
  defaultStatus,
  editingTask,
}: AddTaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To Do");
  const [priority, setPriority] = useState("No Priority");
  const [dueDate, setDueDate] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      setStatus(defaultStatus);
    }
  }, [isOpen, defaultStatus]);

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description ?? "");
      setStatus(editingTask.status);
      setPriority(editingTask.priority ?? "No Priority");
      setDueDate(editingTask.dueDate);
      setTags(editingTask.tags);
    }
  }, [editingTask]);

  const handleSubmit = () => {
    const savedTask: Task = {
      id: editingTask ? editingTask.id : Date.now(),
      title,
      description,
      assignee: editingTask ? editingTask.assignee : "Admin",
      date: new Date(dueDate).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
      }),
      dueDate,
      tags,
      status,
      priority,
    };

    onSaveTask(savedTask);

    setTitle("");
    setDescription("");
    setPriority("No Priority");
    setDueDate("");
    setTags([]);

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-[560px] max-w-full overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 className="text-xl font-semibold">
            {editingTask ? "Edit Task" : "Add Task"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-2 text-xl text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <div className="space-y-5 p-6">
          {/* Title */}
          <div>
            <label className="mb-2 block text-sm">
              Title *
            </label>

            <input
              type="text"
              placeholder="What needs to be done?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-3 text-foreground outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-ring"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm">
              Description
            </label>

            <textarea
              placeholder="Add a description..."
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              className="h-24 w-full resize-none rounded-md border border-input bg-background px-3 py-3 text-foreground outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-ring"
            />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {[
              "Deployment",
              "Testing",
              "Passed",
              "Updated",
              "Audit",
              "Scheduled",
              "Review",
              "Optimization",
              "Research",
            ].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  setTags((currentTags) =>
                    currentTags.includes(tag)
                      ? currentTags.filter(
                          (currentTag) =>
                            currentTag !== tag,
                        )
                      : [...currentTags, tag],
                  );
                }}
                className={`rounded-full border px-3 py-1 text-sm transition ${
                  tags.includes(tag)
                    ? "bg-primary text-primary-foreground"
                    : "border-border bg-muted text-foreground hover:bg-accent"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Status + Priority */}
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="mb-2 block text-sm">
                Status
              </label>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value)
                }
                className="w-full rounded-md border border-input bg-background px-3 py-3 text-foreground outline-none focus:ring-1 focus:ring-ring"
              >
                <option>To Do</option>
                <option>Doing</option>
                <option>Completed</option>
                <option>On Hold</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm">
                Priority
              </label>

              <select
                value={priority}
                onChange={(e) =>
                  setPriority(e.target.value)
                }
                className="w-full rounded-md border border-input bg-background px-3 py-3 text-foreground outline-none focus:ring-1 focus:ring-ring"
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
            <label className="mb-2 block text-sm">
              Due Date
            </label>

            <input
              type="date"
              value={dueDate}
              onChange={(e) =>
                setDueDate(e.target.value)
              }
              className="w-full rounded-md border border-input bg-background px-3 py-3 text-foreground outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-4 border-t border-border px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-4 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-lg bg-primary px-5 py-2 text-sm text-primary-foreground hover:opacity-90"
          >
            {editingTask ? "Save Changes" : "Add Task"}
          </button>
        </div>
      </div>
    </div>
  );
}