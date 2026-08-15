"use client";

import { MoreHorizontal, Plus, Search, Funnel, Columns3 } from "lucide-react";
import { initialProjects } from "@/features/projects/data";

export default function ProjectsPage() {
  return (
    <div className="p-4">
      {/* Toolbar */}
      <div className="flex h-8 items-center justify-between">
        <h1 className="text-sm font-semibold">Projects</h1>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex size-8 items-center justify-center rounded-md border border-[#E5E5E5]"
          >
            <Search className="size-4" />
          </button>

          <button
            type="button"
            className="flex h-8 items-center gap-1.5 rounded-md border border-[#E5E5E5] px-2 text-xs"
          >
            <Columns3 className="size-4" />
            Fields
          </button>

          <button
            type="button"
            className="flex size-8 items-center justify-center rounded-md border border-[#E5E5E5]"
          >
            <Funnel className="size-4" />
          </button>

          <button
            type="button"
            className="flex h-8 items-center gap-1.5 rounded-md bg-[#171717] px-3 text-xs text-white"
          >
            <Plus className="size-3.5" />
            Add Project
          </button>
        </div>
      </div>

      {/* Projects Table */}
      <div className="mt-4 overflow-hidden rounded-lg border">
        {/* Header */}
        <div className="grid grid-cols-[1fr_140px_140px_140px_50px] bg-[#F5F5F5] px-3 py-2 text-xs">
          <span>Projects</span>
          <span>Priority</span>
          <span>Lead</span>
          <span>Due Date</span>
          <span>Actions</span>
        </div>

        {/* Rows */}
        {initialProjects.map((project) => (
          <div
            key={project.id}
            className="grid grid-cols-[1fr_140px_140px_140px_50px] items-center border-t px-3 py-3 text-sm"
          >
            <span>{project.name}</span>

            <span
              className={
                project.priority === "High"
                  ? "text-red-500"
                  : project.priority === "Medium"
                    ? "text-orange-500"
                    : "text-blue-400"
              }
            >
              {project.priority}
            </span>

            <span>{project.lead}</span>

            <span>{project.dueDate}</span>

            <button
              type="button"
              className="flex size-6 items-center justify-center"
            >
              <MoreHorizontal className="size-4" />
            </button>
          </div>
        ))}

        {/* Add Project */}
        <button
          type="button"
          className="flex w-full items-center gap-2 border-t px-3 py-2 text-xs"
        >
          <Plus className="size-4" />
          Add Projects
        </button>
      </div>
    </div>
  );
}