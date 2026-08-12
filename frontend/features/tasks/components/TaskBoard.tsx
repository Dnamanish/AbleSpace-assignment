"use client";

import TaskColumn from "./TaskColumn";
import { Task } from "../types";

type TaskBoardProps = {
  tasks: Task[];
  onAddTask: (status: string) => void;
  onDeleteTask: (id: number) => void;
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
    <>
      {/* Task Board */}
      <div className="mt-4 flex gap-5 overflow-x-auto">
        {columns.map((column) => (
          <TaskColumn
            key={column}
            title={column}
            tasks={tasks}
            onAddTask={() => onAddTask(column)}
            onDeleteTask={onDeleteTask}
            onEditTask={onEditTask}
            showMembers={showMembers}
            showDueDate={showDueDate}
            showLabels={showLabels}
          />
        ))}
      </div>
    </>
  );
}
