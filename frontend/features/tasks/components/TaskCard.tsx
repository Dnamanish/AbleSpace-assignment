"use client";

import { MoreHorizontal } from "lucide-react";

export default function TaskCard() {
  return (
    <div className="w-[273px] h-[114px] rounded-lg border  border-[#E5E5E5] bg-white p-3 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h3>Write API Documentation</h3>

        <button
          type="button"
          aria-label="Task actions"
          className="flex size-5 items-center justify-center"
        >
          <MoreHorizontal className="size-4" />
        </button>
      </div>
    </div>
  );
}
