"use client";

import { useState } from "react";
import {
  MoreHorizontal,
  Plus,
  Search,
  Funnel,
  Columns3,
} from "lucide-react";
import AddProjectModal from "@/features/projects/components/AddProjectModal";
import { useProjects } from "@/features/projects/ProjectProvider";
import type { Project } from "@/features/projects/types";

export default function ProjectsPage() {
  const { projects, saveProject, deleteProject } = useProjects();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [filterOpen, setFilterOpen] = useState(false);
  const [filterPriority, setFilterPriority] = useState("All");
  const [filterLead, setFilterLead] = useState("All");

  const [showPriority, setShowPriority] = useState(true);
  const [showLead, setShowLead] = useState(true);
  const [showDueDate, setShowDueDate] = useState(true);
  const [fieldsOpen, setFieldsOpen] = useState(false);

  const openAddProject = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  const handleSaveProject = (project: Project) => {
    saveProject(project);
    closeModal();
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesPriority =
      filterPriority === "All" || project.priority === filterPriority;

    const matchesLead =
      filterLead === "All" || project.lead === filterLead;

    return matchesSearch && matchesPriority && matchesLead;
  });

  return (
    <div className="p-4">
      {/* Toolbar */}
      <div className="flex h-8 items-center justify-between">
        <h1 className="text-sm font-semibold">Projects</h1>

        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setSearchOpen((current) => !current)}
              className="flex size-8 items-center justify-center rounded-md border border-border"
            >
              <Search className="size-4" />
            </button>

            {searchOpen && (
              <div className="absolute right-10 -top-3 z-30 w-64 rounded-lg border border-border bg-popover p-2 text-popover-foreground shadow-lg">
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search projects..."
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-ring"
                />
              </div>
            )}
          </div>

          {/* Fields */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setFieldsOpen((current) => !current)}
              className="flex h-8 items-center gap-1.5 rounded-md border border-border px-2 text-xs hover:bg-muted"
            >
              <Columns3 className="size-4" />
              Fields
            </button>

            {fieldsOpen && (
              <div className="absolute right-0 top-10 z-30 w-44 rounded-lg border border-border bg-popover p-2 text-popover-foreground shadow-lg">
                <label className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-muted">
                  <input
                    type="checkbox"
                    checked={showPriority}
                    onChange={() =>
                      setShowPriority((current) => !current)
                    }
                  />
                  Priority
                </label>

                <label className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-muted">
                  <input
                    type="checkbox"
                    checked={showLead}
                    onChange={() =>
                      setShowLead((current) => !current)
                    }
                  />
                  Lead
                </label>

                <label className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-muted">
                  <input
                    type="checkbox"
                    checked={showDueDate}
                    onChange={() =>
                      setShowDueDate((current) => !current)
                    }
                  />
                  Due Date
                </label>
              </div>
            )}
          </div>

          {/* Filter */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setFilterOpen((current) => !current)}
              className="flex size-8 items-center justify-center rounded-md border border-border hover:bg-muted"
            >
              <Funnel className="size-4" />
            </button>

            {filterOpen && (
              <div className="absolute right-0 top-10 z-30 w-52 rounded-lg border border-border bg-popover p-3 text-popover-foreground shadow-lg">
                <div className="mb-3">
                  <p className="mb-2 text-xs font-medium text-muted-foreground">
                    Priority
                  </p>

                  <select
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-2 py-1.5 text-sm text-foreground outline-none"
                  >
                    <option>All</option>
                    <option>No Priority</option>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>

                <div>
                  <p className="mb-2 text-xs font-medium text-muted-foreground">
                    Lead
                  </p>

                  <select
                    value={filterLead}
                    onChange={(e) => setFilterLead(e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-2 py-1.5 text-sm text-foreground outline-none"
                  >
                    <option>All</option>
                    <option>Admin</option>
                    <option>CN</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setFilterPriority("All");
                    setFilterLead("All");
                  }}
                  className="mt-3 text-xs text-muted-foreground hover:text-foreground"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>

          {/* Add Project */}
          <button
            type="button"
            onClick={openAddProject}
            className="flex h-8 items-center gap-1.5 rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground hover:opacity-90"
          >
            <Plus className="size-3.5" />
            Add Project
          </button>
        </div>
      </div>

      {/* Projects Table */}
      <div className="mt-4 overflow-visible rounded-lg border border-border">
        {/* Header */}
        <div className="grid grid-cols-[1fr_140px_140px_140px_50px] bg-muted px-3 py-2 text-xs text-muted-foreground">
          <span>Projects</span>

          {showPriority && <span>Priority</span>}

          {showLead && <span>Lead</span>}

          {showDueDate && <span>Due Date</span>}

          <span>Actions</span>
        </div>

        {/* Rows */}
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="grid grid-cols-[1fr_140px_140px_140px_50px] items-center border-t border-border px-3 py-3 text-sm"
          >
            {/* Project name */}
            <span>{project.name}</span>

            {/* Priority */}
            {showPriority && (
              <span
                className={
                  project.priority === "High"
                    ? "text-red-500"
                    : project.priority === "Medium"
                      ? "text-orange-500"
                      : project.priority === "Low"
                        ? "text-blue-400"
                        : "text-muted-foreground"
                }
              >
                {project.priority}
              </span>
            )}

            {/* Lead */}
            {showLead && <span>{project.lead}</span>}

            {/* Due Date */}
            {showDueDate && <span>{project.dueDate}</span>}

            {/* Actions */}
            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setOpenMenuId((current) =>
                    current === project.id ? null : project.id,
                  )
                }
                className="flex size-6 items-center justify-center rounded-md hover:bg-muted"
              >
                <MoreHorizontal className="size-4" />
              </button>

              {openMenuId === project.id && (
                <div className="absolute bottom-7 right-0 z-20 w-28 rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingProject(project);
                      setIsModalOpen(true);
                      setOpenMenuId(null);
                    }}
                    className="w-full rounded px-2 py-1.5 text-left text-sm hover:bg-muted"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      deleteProject(project.id);
                      setOpenMenuId(null);
                    }}
                    className="w-full rounded px-2 py-1.5 text-left text-sm text-destructive hover:bg-muted"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Add Project */}
        <button
          type="button"
          onClick={openAddProject}
          className="flex w-full items-center gap-2 border-t border-border px-3 py-2 text-xs hover:bg-muted"
        >
          <Plus className="size-4" />
          Add Projects
        </button>
      </div>

      {/* Modal */}
      <AddProjectModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSaveProject={handleSaveProject}
        editingProject={editingProject}
      />
    </div>
  );
}