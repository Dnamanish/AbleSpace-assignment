"use client";

import { useEffect, useState } from "react";
import type { Project } from "../types";

type AddProjectModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSaveProject: (project: Project) => void;
  editingProject: Project | null;
};

export default function AddProjectModal({
  isOpen,
  onClose,
  onSaveProject,
  editingProject,
}: AddProjectModalProps) {
  const [name, setName] = useState("");
  const [priority, setPriority] = useState("No Priority");
  const [lead, setLead] = useState("Admin");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    if (editingProject) {
      setName(editingProject.name);
      setPriority(editingProject.priority);
      setLead(editingProject.lead);
      setDueDate(editingProject.dueDate);
    } else {
      setName("");
      setPriority("No Priority");
      setLead("Admin");
      setDueDate("");
    }
  }, [isOpen, editingProject]);

  const handleSubmit = () => {
    if (!name.trim()) return;

    const project: Project = {
      id: editingProject ? editingProject.id : Date.now(),
      name: name.trim(),
      priority,
      lead,
      dueDate,
    };

    onSaveProject(project);

    setName("");
    setPriority("No Priority");
    setLead("Admin");
    setDueDate("");

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-[500px] rounded-2xl border border-border bg-background text-foreground shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 className="text-xl font-semibold">
            {editingProject ? "Edit Project" : "Add Project"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-xl text-muted-foreground hover:text-foreground"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <div className="space-y-5 p-6">
          {/* Name */}
          <div>
            <label className="mb-2 block text-sm">
              Project Name *
            </label>

            <input
              type="text"
              placeholder="Enter project name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-3 text-foreground outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-ring"
            />
          </div>

          {/* Priority + Lead */}
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="mb-2 block text-sm">
                Priority
              </label>

              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-3 text-foreground outline-none"
              >
                <option>No Priority</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm">
                Lead
              </label>

              <select
                value={lead}
                onChange={(e) => setLead(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-3 text-foreground outline-none"
              >
                <option>Admin</option>
                <option>CN</option>
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
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-3 text-foreground outline-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-4 border-t border-border px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-lg bg-primary px-5 py-2 text-sm text-primary-foreground hover:opacity-90"
          >
            {editingProject ? "Save Changes" : "Add Project"}
          </button>
        </div>
      </div>
    </div>
  );
}