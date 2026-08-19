"use client";
import { CalendarDays, MoreHorizontal, Tag, ChevronDown } from "lucide-react";
import type { Task } from "../types";

type TaskListProps = {
  tasks: Task[];
  onAddTask: (status: string) => void;
  onDeleteTask: (id: number) => void;
  onEditTask: (task: Task) => void;
  showMembers: boolean;
  showDueDate: boolean;
  showLabels: boolean;
};

export default function TaskList({
  tasks,
  onAddTask,
  onDeleteTask,
  onEditTask,
  showMembers,
  showDueDate,
  showLabels,
}: TaskListProps) {
  const columns = ["To Do", "Doing", "Completed", "On Hold"];

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case "Urgent":
        return "text-red-600 dark:text-red-400";

      case "High":
        return "text-red-500 dark:text-red-400";

      case "Medium":
        return "text-orange-500 dark:text-orange-400";

      case "Low":
        return "text-blue-400 dark:text-blue-400";

      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="mt-4 space-y-4">
      {columns.map((column) => {
        const columnTasks = tasks.filter((task) => task.status === column);

        return (
          <div
            key={column}
            className="overflow-hidden rounded-lg border border-border bg-card text-card-foreground"
          >
            {/* Status */}
            <div className="flex items-center gap-2 border-b border-border bg-card px-3 py-2">
              <ChevronDown className="size-3.5" />

              <h2 className="text-xs font-semibold">{column}</h2>
            </div>

            {/* Header */}
            <div
              className={`grid items-center bg-muted px-3 py-2 text-xs text-muted-foreground ${
                showMembers && showDueDate
                  ? "grid-cols-[1fr_120px_120px_120px_50px]"
                  : "grid-cols-[1fr_120px_120px_50px]"
              }`}
            >
              <span>Task</span>
              <span>Priority</span>

              {showMembers && <span>Members</span>}
              {showDueDate && <span>Due Date</span>}

              <span>Actions</span>
            </div>

            {/* Rows */}
            {columnTasks.map((task) => (
              <div
                key={task.id}
                className={`grid items-center border-t border-border px-3 py-3 text-sm ${
                  showMembers && showDueDate
                    ? "grid-cols-[1fr_120px_120px_120px_50px]"
                    : "grid-cols-[1fr_120px_120px_50px]"
                }`}
              >
                {/* Task + Labels */}
                <div className="flex min-w-0 items-center gap-2">
                  <span className="truncate">{task.title}</span>

                  {showLabels && task.tags.length > 0 && (
                    <div className="flex shrink-0 gap-1">
                      {task.tags.map((tag, index) => (
                        <span
                          key={`${tag}-${index}`}
                          className="flex items-center gap-1 whitespace-nowrap rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                        >
                          <Tag className="size-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Priority */}
                <span className={getPriorityStyle(task.priority)}>
                  {task.priority}
                </span>

                {/* Members */}
                {showMembers && (
                  <span className="text-sm">{task.assignee}</span>
                )}

                {/* Due Date */}
                {showDueDate && (
                  <span className="flex items-center gap-1">
                    <CalendarDays className="size-3.5" />
                    {task.date}
                  </span>
                )}

                {/* Actions */}
                <div>
                  <button
                    type="button"
                    className="flex size-6 items-center justify-center rounded hover:bg-accent"
                    onClick={() => onEditTask(task)}
                  >
                    <MoreHorizontal className="size-4" />
                  </button>
                </div>
              </div>
            ))}

            {/* Add Task */}
            <button
              type="button"
              onClick={() => onAddTask(column)}
              className="flex w-full items-center gap-2 border-t border-border px-3 py-2 text-xs hover:bg-accent"
            >
              <span className="text-base">+</span>
              Add Task
            </button>
          </div>
        );
      })}
    </div>
  );
}
