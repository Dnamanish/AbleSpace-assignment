"use client";

import type { Task } from "../types";
import { MoreHorizontal, GripVertical } from "lucide-react";
import TaskCard from "./TaskCard";

type TaskColumnProps = {
  title: string;
  tasks: Task[];
  onAddTask: () => void;
  onDeleteTask: (id: string) => void;
  onEditTask: (task: Task) => void;
  showMembers: boolean;
  showDueDate: boolean;
  showLabels: boolean;

  // Drag and drop
  draggable?: boolean;
  onDragStart?: () => void;
  onDragEnd?: () => void;
};

export default function TaskColumn({
  title,
  tasks,
  onAddTask,
  onDeleteTask,
  onEditTask,
  showMembers,
  showDueDate,
  showLabels,
  draggable = false,
  onDragStart,
  onDragEnd,
}: TaskColumnProps) {
  return (
    <div
      className="
        w-[289px]
        shrink-0
        rounded-lg
        bg-muted
        text-foreground
      "
    >
      {/* Column header */}
      <div className="flex h-[39px] items-center justify-between px-3">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Drag Handle */}
          <button
            type="button"
            draggable={draggable}
            onDragStart={(event) => {
              event.stopPropagation();
              onDragStart?.();
            }}
            onDragEnd={(event) => {
              event.stopPropagation();
              onDragEnd?.();
            }}
            aria-label={`Drag ${title} column`}
            className="
              flex
              size-5
              cursor-grab
              items-center
              justify-center
              rounded
              text-muted-foreground
              hover:bg-accent
              hover:text-foreground
              active:cursor-grabbing
            "
          >
            <GripVertical className="size-3.5" />
          </button>

          <h2 className="text-xs font-semibold">
            {title}
          </h2>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onAddTask}
            aria-label={`Add task to ${title}`}
            className="
              flex
              size-5
              items-center
              justify-center
              rounded
              hover:bg-accent
            "
          >
            <span className="text-sm leading-none">
              +
            </span>
          </button>

          <button
            type="button"
            aria-label={`${title} options`}
            className="
              flex
              size-5
              items-center
              justify-center
              rounded
              hover:bg-accent
            "
          >
            <MoreHorizontal className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Task cards */}
      <div className="flex flex-col gap-2 px-2">
        {tasks
          .filter((task) => task.status === title)
          .map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEditTask}
              onDelete={() => onDeleteTask(task.id)}
              showMembers={showMembers}
              showDueDate={showDueDate}
              showLabels={showLabels}
            />
          ))}
      </div>

      {/* Add task */}
      <button
        type="button"
        onClick={onAddTask}
        className="
          flex
          h-10
          w-full
          items-center
          gap-2
          rounded-md
          px-3
          text-sm
          hover:bg-accent
        "
      >
        <span className="text-lg leading-none">
          +
        </span>

        <span>Add Task</span>
      </button>
    </div>
  );
}