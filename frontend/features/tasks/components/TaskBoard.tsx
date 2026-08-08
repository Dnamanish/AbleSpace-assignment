export default function TaskBoard() {
  const columns = ["To Do", "Doing", "Completed", "On Hold"];

  return (
    <div className="mt-4 flex gap-4 overflow-x-auto">
      {columns.map((column) => (
        <div
          key={column}
          className="min-w-[224px] flex-1 rounded-md bg-[#F5F5F5] p-2"
        >
          <div className="flex h-8 items-center justify-between">
            <span className="text-xs font-medium">{column}</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label={`Add task to ${column}`}
                className="flex size-6 items-center justify-center rounded"
              >
                +
              </button>

              <button
                type="button"
                aria-label={`${column} options`}
                className="flex size-6 mb-2.5 items-center justify-center rounded"
              >
                ...
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
