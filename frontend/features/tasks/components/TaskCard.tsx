"use client";

import Image from "next/image";
import { MoreHorizontal, CalendarDays, Tag } from "lucide-react";
import { useState } from "react";
import { Task } from "../types";
import { useRouter } from "next/navigation";

type TaskCardProps = {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: () => void;
  showMembers: boolean;
  showDueDate: boolean;
  showLabels: boolean;
};



export default function TaskCard({
  task,
  onEdit,
  onDelete,
  showMembers,
  showDueDate,
  showLabels,
}: TaskCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <div
      className="w-[273px] rounded-xl border border-[#E5E5E5] bg-white p-3"
      onClick={() => router.push(`/tasks/${task.id}`)}
    >
      {/* Title row */}
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-base font-medium leading-5">{task.title}</h3>

        <div className="relative">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen((current) => !current);
            }}
            className="flex size-5 shrink-0 items-center justify-center"
          >
            <MoreHorizontal className="size-4" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-6 z-20 w-28 rounded-md border bg-white p-1 shadow-md">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(task);
                }}
                className="w-full rounded px-2 py-1.5 text-left text-sm hover:bg-gray-100"
              >
                Edit
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
                className="w-full rounded px-2 py-1.5 text-left text-sm text-red-500 hover:bg-gray-100"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* User + date */}
      <div className="mt-3 flex items-center justify-between">
        {showMembers && (
          <div className="flex items-center gap-2">
            <Image
              src="/Image/dexter-avatar.png"
              alt="Admin"
              width={20}
              height={20}
              className="size-5 rounded-full"
            />

            <span className="text-[16px] leading-3">{task.assignee}</span>
          </div>
        )}

        {showDueDate && (
          <div className="flex h-5 w-[67px] items-center justify-center gap-1 rounded-full bg-[#FDE7E7] text-[12px] text-red-500">
            <CalendarDays className="size-3.5 shrink-0" />
            <span className="whitespace-nowrap">{task.date}</span>
          </div>
        )}
      </div>

      {/* Tags */}
      {showLabels && (
        <div className="mt-4 flex h-5 items-center gap-2">
          {task.tags.map((tag, index) => (
            <span
              key={`${tag}-${index}`}
              className="flex h-5 items-center gap-1 rounded-full bg-[#F5F5F5] px-2 py-1 text-[14px]"
            >
              <Tag className="size-4" />
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
