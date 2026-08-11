"use client";

import { Search, Columns3, Funnel, Plus } from "lucide-react";


type TaskToolbarProps={
  onAddTask:()=>void;
}

export default function TaskToolbar({onAddTask}:TaskToolbarProps) {
  return (
    <div className="flex h-8 items-center justify-between">
      {/* left side text */}
      <h1 className="text-sm font-semibold">Tasks</h1>

      {/*right side element*/}
      <div className="flex items-center gap-2">
        {/* search button */}
        <button
          type="button"
          aria-label="Search tasks"
          className="flex size-8 items-center justify-center rounded-md border border-[#E5E5E5]"
        >
          <Search className="size-4" />
        </button>

        {/* field button */}
        <button
          type="button"
          aria-label="Search tasks"
          className="flex h-8 items-center gap-1.5 rounded-md border border-[#E5E5E5] px-2 text-xs"
        >
          <Columns3 className="size-4" />
          <span>Fields</span>
        </button>

        {/* filter */}
        <button
          type="button"
          aria-label="filter tasks"
          className="flex size-8 items-center justify-center rounded-md border border-[#E5E5E5]"
        >
          <Funnel className="size-4" />
        </button>

        {/* add task */}
        <button
          type="button"
          onClick={onAddTask}
          className="flex h-8 items-center gap-1.5 rounded-md bg-[#171717] px-3 text-xs text-white"
        >
          <Plus className="size-3.5" />
          <span>Add Task </span>
        </button>
      </div>
    </div>
  );
}
