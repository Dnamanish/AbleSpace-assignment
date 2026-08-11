"use client";

import Image from "next/image";
import { MoreHorizontal, CalendarDays, Tag } from "lucide-react";

type TaskCardProps = {
  title: string;
  assignee: string;
  date: string;
  tags: string[];
};

export default function TaskCard({
  title,
  assignee,
  date,
  tags,
}: TaskCardProps) {
  return (
    <div className="w-[273px] rounded-xl border border-[#E5E5E5] bg-white p-3">
      {/* Title row */}
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-base font-medium leading-5">
         {title}
        </h3>

        <button
          type="button"
          aria-label="Task actions"
          className="flex size-5 shrink-0 items-center justify-center"
        >
          <MoreHorizontal className="size-4" />
        </button>
      </div>

      {/* User + date */}
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src="/Image/dexter-avatar.png"
            alt="Admin"
            width={20}
            height={20}
            className="size-5 rounded-full"
          />

          <span className="text-[16px] leading-3">{assignee}</span>
        </div>

        <div className="flex h-5 w-[67px] items-center justify-center gap-1 rounded-full bg-[#FDE7E7] text-[12px] text-red-500">
          <CalendarDays className="size-3.5 shrink-0" />
          <span className="whitespace-nowrap">{date}</span>
        </div>
      </div>

      {/* Tags */}
      <div className="mt-4 flex h-5 items-center gap-2">
        <span className="flex h-5 items-center gap-1 rounded-full bg-[#F5F5F5] px-2 py-1 text-[14px]">
          <Tag className="size-4" />
          Deployment
        </span>

        <span className="flex h-5 items-center gap-1 rounded-full bg-[#F5F5F5] px-2 py-1 text-[14px]">
          <Tag className="size-4" />
          Deployment
        </span>
      </div>
    </div>
  );
}
