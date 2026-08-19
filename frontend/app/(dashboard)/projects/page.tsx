"use client";

import { useState } from "react";
import {
  MoreHorizontal,
  Plus,
  Search,
  Funnel,
  Columns3,
  Circle,
  ChartNoAxesColumnIncreasing,
  Users,
  CalendarDays,
  UsersRound,
  Tag,
  User,
  ChevronRight,
  Check,
} from "lucide-react";

import AddProjectModal from "@/features/projects/components/AddProjectModal";
import { useProjects } from "@/features/projects/ProjectProvider";
import type { Project } from "@/features/projects/types";

export default function ProjectsPage() {
  const { projects, saveProject, deleteProject } = useProjects();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] =
    useState<Project | null>(null);

  const [openMenuId, setOpenMenuId] =
    useState<string | null>(null);

  const [searchOpen, setSearchOpen] =
    useState(false);

  const [searchQuery, setSearchQuery] =
    useState("");

  const [filterOpen, setFilterOpen] =
    useState(false);

  const [filterPriority, setFilterPriority] =
    useState("All");

  const [filterLead, setFilterLead] =
    useState("All");

  const [showPriority, setShowPriority] =
    useState(true);

  const [showLead, setShowLead] =
    useState(true);

  const [showDueDate, setShowDueDate] =
    useState(true);

  const [fieldsOpen, setFieldsOpen] =
    useState(false);

  const [openFieldMenu, setOpenFieldMenu] =
    useState<
      | "status"
      | "priority"
      | "members"
      | "dueDate"
      | "teams"
      | "labels"
      | "reporter"
      | null
    >(null);

  const openAddProject = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  const handleSaveProject = (
    project: Project,
  ) => {
    saveProject(project);
    closeModal();
  };

  const filteredProjects =
    projects.filter((project) => {
      const matchesSearch =
        project.name
          .toLowerCase()
          .includes(
            searchQuery.toLowerCase(),
          );

      const matchesPriority =
        filterPriority === "All" ||
        project.priority ===
          filterPriority;

      const matchesLead =
        filterLead === "All" ||
        project.lead === filterLead;

      return (
        matchesSearch &&
        matchesPriority &&
        matchesLead
      );
    });

  const toggleFieldMenu = (
    menu:
      | "status"
      | "priority"
      | "members"
      | "dueDate"
      | "teams"
      | "labels"
      | "reporter",
  ) => {
    setOpenFieldMenu((current) =>
      current === menu ? null : menu,
    );
  };

  return (
    <div className="p-4">
      {/* Toolbar */}
      <div className="flex h-8 items-center justify-between">
        <h1 className="text-sm font-semibold">
          Projects
        </h1>

        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setSearchOpen(
                  (current) => !current,
                );
              }}
              className="flex size-8 items-center justify-center rounded-md border border-border hover:bg-muted"
            >
              <Search className="size-4" />
            </button>

            {searchOpen && (
              <div className="absolute right-10 -top-3 z-30 w-64 rounded-lg border border-border bg-popover p-2 text-popover-foreground shadow-lg">
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) =>
                    setSearchQuery(
                      e.target.value,
                    )
                  }
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
              onClick={() => {
                setFieldsOpen(
                  (current) => !current,
                );
                setOpenFieldMenu(null);
              }}
              className="flex h-8 items-center gap-1.5 rounded-md border border-border px-2 text-xs hover:bg-muted"
            >
              <Columns3 className="size-4" />
              Fields
            </button>

            {fieldsOpen && (
              <div className="absolute right-0 top-10 z-40 w-44 rounded-lg border border-border bg-popover p-1.5 text-popover-foreground shadow-lg">
                {/* Status */}
                <button
                  type="button"
                  onClick={() =>
                    toggleFieldMenu(
                      "status",
                    )
                  }
                  className="flex w-full items-center justify-between rounded-md px-2 py-2 text-sm hover:bg-muted"
                >
                  <span className="flex items-center gap-2">
                    <Circle className="size-3.5" />
                    Status
                  </span>

                  <ChevronRight className="size-3.5 text-muted-foreground" />
                </button>

                {/* Priority */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() =>
                      toggleFieldMenu(
                        "priority",
                      )
                    }
                    className="flex w-full items-center justify-between rounded-md px-2 py-2 text-sm hover:bg-muted"
                  >
                    <span className="flex items-center gap-2">
                      <ChartNoAxesColumnIncreasing className="size-3.5" />
                      Priority
                    </span>

                    <ChevronRight className="size-3.5 text-muted-foreground" />
                  </button>

                  {openFieldMenu ===
                    "priority" && (
                    <div className="absolute right-[calc(100%+6px)] top-0 z-50 w-44 rounded-lg border border-border bg-popover p-1.5 shadow-lg">
                      <p className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                        Priority
                      </p>

                      {[
                        "No Priority",
                        "Urgent",
                        "High",
                        "Medium",
                        "Low",
                      ].map(
                        (priority) => (
                          <button
                            key={
                              priority
                            }
                            type="button"
                            onClick={() => {
                              setFilterPriority(
                                priority ===
                                  "No Priority"
                                  ? "No Priority"
                                  : priority,
                              );

                              setOpenFieldMenu(
                                null,
                              );
                            }}
                            className="flex w-full items-center justify-between rounded-md px-2 py-2 text-sm hover:bg-muted"
                          >
                            <span
                              className={
                                priority ===
                                "Urgent"
                                  ? "text-red-500"
                                  : priority ===
                                      "High"
                                    ? "text-red-500"
                                    : priority ===
                                        "Medium"
                                      ? "text-orange-500"
                                      : priority ===
                                          "Low"
                                        ? "text-blue-400"
                                        : "text-muted-foreground"
                              }
                            >
                              {priority}
                            </span>

                            {filterPriority ===
                              priority && (
                              <Check className="size-3.5" />
                            )}
                          </button>
                        ),
                      )}
                    </div>
                  )}
                </div>

                {/* Members */}
                <button
                  type="button"
                  onClick={() =>
                    toggleFieldMenu(
                      "members",
                    )
                  }
                  className="flex w-full items-center justify-between rounded-md px-2 py-2 text-sm hover:bg-muted"
                >
                  <span className="flex items-center gap-2">
                    <Users className="size-3.5" />
                    Members
                  </span>

                  <ChevronRight className="size-3.5 text-muted-foreground" />
                </button>

                {/* Due Date */}
                <button
                  type="button"
                  onClick={() =>
                    toggleFieldMenu(
                      "dueDate",
                    )
                  }
                  className="flex w-full items-center justify-between rounded-md px-2 py-2 text-sm hover:bg-muted"
                >
                  <span className="flex items-center gap-2">
                    <CalendarDays className="size-3.5" />
                    Due Date
                  </span>

                  <ChevronRight className="size-3.5 text-muted-foreground" />
                </button>

                {/* Teams */}
                <button
                  type="button"
                  onClick={() =>
                    toggleFieldMenu(
                      "teams",
                    )
                  }
                  className="flex w-full items-center justify-between rounded-md px-2 py-2 text-sm hover:bg-muted"
                >
                  <span className="flex items-center gap-2">
                    <UsersRound className="size-3.5" />
                    Teams
                  </span>

                  <ChevronRight className="size-3.5 text-muted-foreground" />
                </button>

                {/* Labels */}
                <button
                  type="button"
                  onClick={() =>
                    toggleFieldMenu(
                      "labels",
                    )
                  }
                  className="flex w-full items-center justify-between rounded-md px-2 py-2 text-sm hover:bg-muted"
                >
                  <span className="flex items-center gap-2">
                    <Tag className="size-3.5" />
                    Labels
                  </span>

                  <ChevronRight className="size-3.5 text-muted-foreground" />
                </button>

                {/* Reporter */}
                <button
                  type="button"
                  onClick={() =>
                    toggleFieldMenu(
                      "reporter",
                    )
                  }
                  className="flex w-full items-center justify-between rounded-md px-2 py-2 text-sm hover:bg-muted"
                >
                  <span className="flex items-center gap-2">
                    <User className="size-3.5" />
                    Reporter
                  </span>

                  <ChevronRight className="size-3.5 text-muted-foreground" />
                </button>
              </div>
            )}
          </div>

          {/* Filter */}
          <div className="relative">
            <button
              type="button"
              onClick={() =>
                setFilterOpen(
                  (current) => !current,
                )
              }
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
                    value={
                      filterPriority
                    }
                    onChange={(e) =>
                      setFilterPriority(
                        e.target.value,
                      )
                    }
                    className="w-full rounded-md border border-input bg-background px-2 py-1.5 text-sm text-foreground outline-none"
                  >
                    <option>
                      All
                    </option>
                    <option>
                      No Priority
                    </option>
                    <option>
                      Low
                    </option>
                    <option>
                      Medium
                    </option>
                    <option>
                      High
                    </option>
                  </select>
                </div>

                <div>
                  <p className="mb-2 text-xs font-medium text-muted-foreground">
                    Lead
                  </p>

                  <select
                    value={filterLead}
                    onChange={(e) =>
                      setFilterLead(
                        e.target.value,
                      )
                    }
                    className="w-full rounded-md border border-input bg-background px-2 py-1.5 text-sm text-foreground outline-none"
                  >
                    <option>
                      All
                    </option>
                    <option>
                      Admin
                    </option>
                    <option>
                      CN
                    </option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setFilterPriority(
                      "All",
                    );
                    setFilterLead(
                      "All",
                    );
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
            onClick={
              openAddProject
            }
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
        <div
          className={`grid items-center bg-muted px-3 py-2 text-xs text-muted-foreground ${
            showPriority &&
            showLead &&
            showDueDate
              ? "grid-cols-[1fr_140px_140px_140px_50px]"
              : "grid-cols-[1fr_140px_140px_50px]"
          }`}
        >
          <span>
            Projects
          </span>

          {showPriority && (
            <span>
              Priority
            </span>
          )}

          {showLead && (
            <span>
              Lead
            </span>
          )}

          {showDueDate && (
            <span>
              Due Date
            </span>
          )}

          <span>
            Actions
          </span>
        </div>

        {/* Rows */}
        {filteredProjects.map(
          (project) => (
            <div
              key={project.id}
              className={`grid items-center border-t border-border px-3 py-3 text-sm ${
                showPriority &&
                showLead &&
                showDueDate
                  ? "grid-cols-[1fr_140px_140px_140px_50px]"
                  : "grid-cols-[1fr_140px_140px_50px]"
              }`}
            >
              {/* Project name */}
              <span>
                {project.name}
              </span>

              {/* Priority */}
              {showPriority && (
                <span
                  className={
                    project.priority ===
                    "High"
                      ? "text-red-500"
                      : project.priority ===
                          "Medium"
                        ? "text-orange-500"
                        : project.priority ===
                            "Low"
                          ? "text-blue-400"
                          : "text-muted-foreground"
                  }
                >
                  {project.priority}
                </span>
              )}

              {/* Lead */}
              {showLead && (
                <span>
                  {project.lead}
                </span>
              )}

              {/* Due Date */}
              {showDueDate && (
                <span>
                  {project.dueDate}
                </span>
              )}

              {/* Actions */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setOpenMenuId(
                      (current) =>
                        current ===
                        project.id
                          ? null
                          : project.id,
                    )
                  }
                  className="flex size-6 items-center justify-center rounded-md hover:bg-muted"
                >
                  <MoreHorizontal className="size-4" />
                </button>

                {openMenuId ===
                  project.id && (
                  <div className="absolute bottom-7 right-0 z-20 w-28 rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingProject(
                          project,
                        );
                        setIsModalOpen(
                          true,
                        );
                        setOpenMenuId(
                          null,
                        );
                      }}
                      className="w-full rounded px-2 py-1.5 text-left text-sm hover:bg-muted"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        deleteProject(
                          project.id,
                        );
                        setOpenMenuId(
                          null,
                        );
                      }}
                      className="w-full rounded px-2 py-1.5 text-left text-sm text-destructive hover:bg-muted"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ),
        )}

        {/* Add Project */}
        <button
          type="button"
          onClick={
            openAddProject
          }
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
        onSaveProject={
          handleSaveProject
        }
        editingProject={
          editingProject
        }
      />
    </div>
  );
}