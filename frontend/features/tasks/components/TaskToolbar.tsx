"use client";

import { Search, Columns3, Funnel, Plus } from "lucide-react";
import { useState } from "react";

type TaskToolbarProps = {
  onAddTask: () => void;
  onSearch: (query: string) => void;
  onFilterStatus: (status: string) => void;
  onFilterPriority: (priority: string) => void;
  onToggleMembers: () => void;
  onToggleDueDate: () => void;
  onToggleLabels: () => void;
  showMembers: boolean;
  showDueDate: boolean;
  showLabels: boolean;
  onChangeView: (view: "board" | "list") => void;
  viewMode: "board" | "list";
};

export default function TaskToolbar({
  onAddTask,
  onSearch,
  onFilterStatus,
  onFilterPriority,
  onToggleMembers,
  onToggleDueDate,
  onToggleLabels,
  showMembers,
  showDueDate,
  showLabels,
  onChangeView,
  viewMode,
}: TaskToolbarProps) {
  const [isSearching, setIsSearching] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isFieldsOpen, setIsFieldsOpen] = useState(false);

  return (
    <div className="flex h-8 items-center justify-between">
      <h1 className="text-sm font-semibold">Tasks</h1>

      <div className="flex items-center gap-2">
        {/* Search */}
        {isSearching && (
          <input
            type="text"
            autoFocus
            placeholder="Search tasks..."
            onChange={(e) => onSearch(e.target.value)}
            className="h-8 w-48 rounded-md border border-[#E5E5E5] px-2 text-xs outline-none"
          />
        )}

        <button
          type="button"
          aria-label="Search tasks"
          onClick={() => setIsSearching((current) => !current)}
          className="flex size-8 items-center justify-center rounded-md border border-[#E5E5E5]"
        >
          <Search className="size-4" />
        </button>

        {/* Fields */}
        <div className="relative">
          <button
            type="button"
            aria-label="Fields"
            onClick={() => setIsFieldsOpen((current) => !current)}
            className="flex h-8 items-center gap-1.5 rounded-md border border-[#E5E5E5] px-2 text-xs"
          >
            <Columns3 className="size-4" />
            <span>Fields</span>
          </button>

          {isFieldsOpen && (
            <div className="absolute right-0 top-10 z-30 w-56 rounded-lg border bg-white p-4 shadow-lg">
              <p className="mb-3 text-xs font-semibold">Show fields</p>

              <label className="flex items-center justify-between py-2 text-sm">
                Members
                <input
                  type="checkbox"
                  checked={showMembers}
                  onChange={onToggleMembers}
                />
              </label>

              <label className="flex items-center justify-between py-2 text-sm">
                Due Date
                <input
                  type="checkbox"
                  checked={showDueDate}
                  onChange={onToggleDueDate}
                />
              </label>

              <label className="flex items-center justify-between py-2 text-sm">
                Labels
                <input
                  type="checkbox"
                  checked={showLabels}
                  onChange={onToggleLabels}
                />
              </label>
            </div>
          )}
        </div>

        {/* Filter */}
        <div className="relative">
          <button
            type="button"
            aria-label="Filter tasks"
            onClick={() => setIsFilterOpen((current) => !current)}
            className="flex size-8 items-center justify-center rounded-md border border-[#E5E5E5]"
          >
            <Funnel className="size-4" />
          </button>

          {isFilterOpen && (
            <div className="absolute right-0 top-10 z-30 w-56 rounded-lg border bg-white p-4 shadow-lg">
              <p className="mb-2 text-xs font-semibold">Status</p>

              <select
                onChange={(e) => onFilterStatus(e.target.value)}
                className="mb-4 w-full rounded-md border px-2 py-2 text-sm"
              >
                <option value="All">All</option>
                <option value="To Do">To Do</option>
                <option value="Doing">Doing</option>
                <option value="Completed">Completed</option>
                <option value="On Hold">On Hold</option>
              </select>

              <p className="mb-2 text-xs font-semibold">Priority</p>

              <select
                onChange={(e) => onFilterPriority(e.target.value)}
                className="w-full rounded-md border px-2 py-2 text-sm"
              >
                <option value="All">All</option>
                <option value="No Priority">No Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          )}
        </div>

        {/* View Mode */}
        <div className="flex h-8 overflow-hidden rounded-md border border-[#E5E5E5]">
          <button
            type="button"
            onClick={() => onChangeView("list")}
            className={`px-3 text-xs ${
              viewMode === "list" ? "bg-[#F5F5F5] font-medium" : ""
            }`}
          >
            List
          </button>

          <button
            type="button"
            onClick={() => onChangeView("board")}
            className={`px-3 text-xs ${
              viewMode === "board" ? "bg-[#F5F5F5] font-medium" : ""
            }`}
          >
            Board
          </button>
        </div>

        {/* Add Task */}
        <button
          type="button"
          onClick={onAddTask}
          className="flex h-8 items-center gap-1.5 rounded-md bg-[#171717] px-3 text-xs text-white"
        >
          <Plus className="size-3.5" />
          <span>Add Task</span>
        </button>
      </div>
    </div>
  );
}
