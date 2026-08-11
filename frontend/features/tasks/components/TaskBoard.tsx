"use client";

import TaskColumn from "./TaskColumn";
import { Task } from "../types";

type TaskBoardProps = {
  tasks: Task[];
  onAddTask: () => void;
};

export default function TaskBoard({ tasks, onAddTask }: TaskBoardProps) {
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
            onAddTask={onAddTask}
          />
        ))}
      </div>
    </>
  );
}
