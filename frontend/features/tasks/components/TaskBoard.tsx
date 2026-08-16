"use client";

import TaskColumn from "./TaskColumn";
import { Task } from "../types";

type TaskBoardProps = {
  tasks: Task[];
  onAddTask: (status: string) => void;
  onDeleteTask: (id: string) => void;
  onEditTask: (task: Task) => void;
  showMembers: boolean;
  showDueDate: boolean;
  showLabels: boolean;
};

export default function TaskBoard({
  tasks,
  onAddTask,
  onDeleteTask,
  onEditTask,
  showMembers,
  showDueDate,
  showLabels,
}: TaskBoardProps) {
  const columns = ["To Do", "Doing", "Completed", "On Hold"];

  return (
    <div
      className="
        mt-4
        max-h-[calc(100vh-120px)]
        min-h-0
        overflow-auto
        [scrollbar-width:none]
        [&::-webkit-scrollbar]:hidden
      "
    >
      <div className="flex min-w-max gap-6 pb-4">
        {columns.map((column) => (
          <div
            key={column}
            className="w-[280px] shrink-0"
          >
            <TaskColumn
              title={column}
              tasks={tasks}
              onAddTask={() => onAddTask(column)}
              onDeleteTask={onDeleteTask}
              onEditTask={onEditTask}
              showMembers={showMembers}
              showDueDate={showDueDate}
              showLabels={showLabels}
            />
          </div>
        ))}
      </div>
    </div>
  );
}