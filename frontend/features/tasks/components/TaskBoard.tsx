"use client";

import { useState } from "react";
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

const DEFAULT_COLUMNS = [
  "To Do",
  "Doing",
  "Completed",
  "On Hold",
];

export default function TaskBoard({
  tasks,
  onAddTask,
  onDeleteTask,
  onEditTask,
  showMembers,
  showDueDate,
  showLabels,
}: TaskBoardProps) {
  const [columns, setColumns] = useState(DEFAULT_COLUMNS);
  const [draggedColumn, setDraggedColumn] = useState<string | null>(
    null,
  );

  const handleColumnDragStart = (column: string) => {
    setDraggedColumn(column);
  };

  const handleColumnDragEnd = () => {
    setDraggedColumn(null);
  };

  const handleColumnDrop = (targetColumn: string) => {
    if (!draggedColumn || draggedColumn === targetColumn) {
      setDraggedColumn(null);
      return;
    }

    setColumns((currentColumns) => {
      const newColumns = [...currentColumns];

      const draggedIndex = newColumns.indexOf(draggedColumn);
      const targetIndex = newColumns.indexOf(targetColumn);

      if (draggedIndex === -1 || targetIndex === -1) {
        return currentColumns;
      }

      // Remove dragged column
      newColumns.splice(draggedIndex, 1);

      // Find target again after removal
      const newTargetIndex = newColumns.indexOf(targetColumn);

      // Insert dragged column before target
      newColumns.splice(newTargetIndex, 0, draggedColumn);

      return newColumns;
    });

    setDraggedColumn(null);
  };

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
            className={`
              w-[280px]
              shrink-0
              transition-opacity
              ${
                draggedColumn === column
                  ? "opacity-50"
                  : "opacity-100"
              }
            `}
            onDragOver={(event) => {
              event.preventDefault();
            }}
            onDrop={() => handleColumnDrop(column)}
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
              draggable
              onDragStart={() =>
                handleColumnDragStart(column)
              }
              onDragEnd={handleColumnDragEnd}
            />
          </div>
        ))}
      </div>
    </div>
  );
}