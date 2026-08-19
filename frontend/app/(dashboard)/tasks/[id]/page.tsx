"use client";

import {
  CalendarDays,
  Lock,
  Eye,
  Share2,
  MoreHorizontal,
  Plus,
  Users,
  Paperclip,
  Send,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Settings,
} from "lucide-react";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { useTasks } from "@/features/tasks/TaskProvider";

export default function TaskDetailPage() {
  const params = useParams();

  const {
    tasks,
    updateTask,
  } = useTasks();

  const [comment, setComment] =
    useState("");

  const [
    isCalendarOpen,
    setIsCalendarOpen,
  ] = useState(false);

  const [
    calendarDate,
    setCalendarDate,
  ] = useState(new Date());

  const taskId =
    params.id as string;

  const task = tasks.find(
    (currentTask) =>
      currentTask.id === taskId,
  );

  /*
   * Convert YYYY-MM-DD
   * to local Date
   */
  const parseDate = (
    dateString: string,
  ) => {
    if (!dateString) return null;

    const parts =
      dateString.split("-");

    if (parts.length !== 3) {
      return null;
    }

    const date = new Date(
      Number(parts[0]),
      Number(parts[1]) - 1,
      Number(parts[2]),
    );

    return Number.isNaN(
      date.getTime(),
    )
      ? null
      : date;
  };

  /*
   * Set calendar to task's due date
   */
  useEffect(() => {
    if (!task?.dueDate) return;

    const date = parseDate(
      task.dueDate,
    );

    if (date) {
      setCalendarDate(date);
    }
  }, [task?.dueDate]);

  if (!task) {
    return (
      <div className="p-6">
        Task not found.
      </div>
    );
  }

  /*
   * Display date
   */
  const formatDueDate = () => {
    const date = parseDate(
      task.dueDate,
    );

    if (!date) {
      return "No date";
    }

    return date.toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
      },
    );
  };

  /*
   * Calendar
   */
  const year =
    calendarDate.getFullYear();

  const month =
    calendarDate.getMonth();

  const firstDay = new Date(
    year,
    month,
    1,
  ).getDay();

  const daysInMonth =
    new Date(
      year,
      month + 1,
      0,
    ).getDate();

  /*
   * Previous month
   */
  const previousMonth = () => {
    setCalendarDate(
      new Date(
        year,
        month - 1,
        1,
      ),
    );
  };

  /*
   * Next month
   */
  const nextMonth = () => {
    setCalendarDate(
      new Date(
        year,
        month + 1,
        1,
      ),
    );
  };

  /*
   * Select date
   */
  const handleDateSelect = async (
    day: number,
  ) => {
    const date = new Date(
      year,
      month,
      day,
    );

    const formattedDate =
      `${date.getFullYear()}-${String(
        date.getMonth() + 1,
      ).padStart(2, "0")}-${String(
        date.getDate(),
      ).padStart(2, "0")}`;

    const displayDate =
      date.toLocaleDateString(
        "en-US",
        {
          month: "short",
          day: "numeric",
        },
      );

    await updateTask(
      task.id,
      {
        dueDate: formattedDate,
        date: displayDate,
      },
    );

    setCalendarDate(date);

    setIsCalendarOpen(false);
  };

  /*
   * Date selected?
   */
  const isSelected = (
    day: number,
  ) => {
    const selected =
      parseDate(task.dueDate);

    if (!selected) return false;

    return (
      selected.getFullYear() ===
        year &&
      selected.getMonth() ===
        month &&
      selected.getDate() === day
    );
  };

  /*
   * Activity timestamp
   */
  const formatActivityTime = (
    timestamp: string,
  ) => {
    const date =
      new Date(timestamp);

    return date.toLocaleString(
      "en-US",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      },
    );
  };

  return (
    <div className="min-h-screen bg-background p-6 text-foreground">
      {/* ====================================================== */}
      {/* HEADER */}
      {/* ====================================================== */}

      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold">
            {task.title}
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            {task.description}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex size-9 items-center justify-center rounded-md border border-border hover:bg-muted"
          >
            <Lock className="size-4" />
          </button>

          <button
            type="button"
            className="flex size-9 items-center justify-center gap-1 rounded-md border border-border hover:bg-muted"
          >
            <Eye className="size-4" />

            <span className="text-xs">
              1
            </span>
          </button>

          <button
            type="button"
            className="flex size-9 items-center justify-center rounded-md border border-border hover:bg-muted"
          >
            <Share2 className="size-4" />
          </button>

          <button
            type="button"
            className="flex size-9 items-center justify-center rounded-md border border-border hover:bg-muted"
          >
            <MoreHorizontal className="size-4" />
          </button>
        </div>
      </div>

      {/* ====================================================== */}
      {/* MAIN */}
      {/* ====================================================== */}

      <div className="grid grid-cols-[minmax(0,1fr)_300px] gap-6">
        {/* ==================================================== */}
        {/* LEFT */}
        {/* ==================================================== */}

        <div>
          {/* Properties */}
          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-4">
              <span className="w-16 text-muted-foreground">
                Properties
              </span>

              <span className="flex items-center gap-2">
                <span className="flex size-6 items-center justify-center rounded-full bg-muted text-xs">
                  {task.assignee.charAt(
                    0,
                  )}
                </span>

                {task.assignee}
              </span>

              <span className="flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-xs">
                <CalendarDays className="size-3" />

                {formatDueDate()}
              </span>
            </div>

            {/* Labels */}
            <div className="flex items-start gap-4">
              <span className="w-16 text-muted-foreground">
                Labels
              </span>

              <div className="flex flex-wrap gap-1">
                {task.tags.map(
                  (tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-muted px-2 py-1 text-xs"
                    >
                      {tag}
                    </span>
                  ),
                )}
              </div>
            </div>

            {/* Resources */}
            <div className="flex items-center gap-4">
              <span className="w-16 text-muted-foreground">
                Resources
              </span>

              <button
                type="button"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                + Add document or link...
              </button>
            </div>
          </div>

          {/* ================================================== */}
          {/* SUBTASKS */}
          {/* ================================================== */}

          <div className="mt-8">
            <div className="mb-3 flex items-center gap-2">
              <ChevronDown className="size-4" />

              <h2 className="text-sm font-semibold">
                Subtasks
              </h2>
            </div>

            <div className="overflow-hidden rounded-lg border border-border">
              <div className="grid grid-cols-[1fr_120px_120px_120px_50px] bg-muted px-3 py-3 text-xs">
                <span>Task</span>
                <span>Priority</span>
                <span>Members</span>
                <span>Due Date</span>
                <span>Actions</span>
              </div>

              {[
                [
                  "Subtask 1",
                  "High",
                  "Admin",
                  "12 Sep 2026",
                ],
                [
                  "Subtask 2",
                  "Low",
                  "CN",
                  "15 Sep 2026",
                ],
                [
                  "Subtask 3",
                  "Medium",
                  "+",
                  "18 Sep 2026",
                ],
              ].map(
                ([
                  title,
                  priority,
                  member,
                  date,
                ]) => (
                  <div
                    key={title}
                    className="grid grid-cols-[1fr_120px_120px_120px_50px] items-center border-t border-border px-3 py-3 text-sm"
                  >
                    <span>{title}</span>

                    <span
                      className={
                        priority ===
                        "High"
                          ? "text-red-500"
                          : priority ===
                              "Medium"
                            ? "text-orange-500"
                            : "text-blue-400"
                      }
                    >
                      {priority}
                    </span>

                    <span>
                      {member}
                    </span>

                    <span>
                      {date}
                    </span>

                    <button type="button">
                      <MoreHorizontal className="size-4" />
                    </button>
                  </div>
                ),
              )}

              <button
                type="button"
                className="flex w-full items-center gap-2 border-t border-border px-3 py-3 text-sm hover:bg-muted"
              >
                <Plus className="size-4" />

                Add Subtasks
              </button>
            </div>
          </div>

          {/* ================================================== */}
          {/* COMMENT / UPDATE BOX */}
          {/* ================================================== */}

          <div className="mt-6">
            <div className="rounded-lg border border-border">
              <div className="flex items-center gap-2 p-3">
                <div className="flex size-7 items-center justify-center rounded-full bg-muted text-xs">
                  Y
                </div>

                <input
                  value={comment}
                  onChange={(e) =>
                    setComment(
                      e.target.value,
                    )
                  }
                  placeholder="Leave a reply..."
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />

                <Paperclip className="size-4 text-muted-foreground" />

                <button
                  type="button"
                  className="text-muted-foreground"
                >
                  <Send className="size-4" />
                </button>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2 rounded-lg border border-border p-3">
              <input
                placeholder="Add a comment..."
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />

              <Paperclip className="size-4 text-muted-foreground" />

              <Send className="size-4 text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* ==================================================== */}
        {/* RIGHT */}
        {/* ==================================================== */}

        <div>
          {/* Details */}
          <div className="rounded-lg border border-border">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <div className="flex items-center gap-2">
                <ChevronDown className="size-4" />

                <h2 className="text-sm font-semibold">
                  Details
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <Plus className="size-4" />

                <Settings className="size-4" />
              </div>
            </div>

            <div className="space-y-5 p-4 text-sm">
              {/* Status */}
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  Status
                </span>

                <select
                  value={task.status}
                  onChange={(e) =>
                    updateTask(
                      task.id,
                      {
                        status:
                          e.target.value,
                      },
                    )
                  }
                  className="rounded-md border border-border bg-background px-3 py-1.5 text-sm outline-none"
                >
                  <option>
                    To Do
                  </option>

                  <option>
                    Doing
                  </option>

                  <option>
                    Completed
                  </option>

                  <option>
                    On Hold
                  </option>
                </select>
              </div>

              {/* Priority */}
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  Priority
                </span>

                <select
                  value={task.priority}
                  onChange={(e) =>
                    updateTask(
                      task.id,
                      {
                        priority:
                          e.target.value,
                      },
                    )
                  }
                  className="rounded-md border border-border bg-background px-3 py-1.5 text-sm outline-none"
                >
                  <option>
                    No Priority
                  </option>

                  <option>
                    Low
                  </option>

                  <option>
                    Medium
                  </option>

                  <option>
                    High
                  </option>
                </select>
              </div>

              {/* Members */}
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Members
                </span>

                <span className="flex items-center gap-1">
                  <Users className="size-3.5" />

                  {task.assignee}
                </span>
              </div>

              {/* ================================================= */}
              {/* DATE */}
              {/* ================================================= */}

              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    Dates
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setIsCalendarOpen(
                        (current) =>
                          !current,
                      )
                    }
                    className="flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs hover:bg-muted"
                  >
                    <CalendarDays className="size-3" />

                    {formatDueDate()}
                  </button>
                </div>

                {/* CALENDAR */}
                {isCalendarOpen && (
                  <div className="absolute right-0 top-9 z-[100] w-[280px] rounded-xl border border-border bg-background p-4 shadow-xl">
                    <div className="mb-4 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={
                          previousMonth
                        }
                        className="flex size-7 items-center justify-center rounded-md hover:bg-muted"
                      >
                        <ChevronLeft className="size-4" />
                      </button>

                      <span className="text-sm font-medium">
                        {calendarDate.toLocaleDateString(
                          "en-US",
                          {
                            month:
                              "long",
                            year: "numeric",
                          },
                        )}
                      </span>

                      <button
                        type="button"
                        onClick={
                          nextMonth
                        }
                        className="flex size-7 items-center justify-center rounded-md hover:bg-muted"
                      >
                        <ChevronRight className="size-4" />
                      </button>
                    </div>

                    <div className="mb-2 grid grid-cols-7 text-center text-[11px] text-muted-foreground">
                      <span>Su</span>
                      <span>Mo</span>
                      <span>Tu</span>
                      <span>We</span>
                      <span>Th</span>
                      <span>Fr</span>
                      <span>Sa</span>
                    </div>

                    <div className="grid grid-cols-7 gap-1">
                      {Array.from({
                        length: firstDay,
                      }).map(
                        (_, index) => (
                          <span
                            key={`empty-${index}`}
                            className="size-8"
                          />
                        ),
                      )}

                      {Array.from({
                        length:
                          daysInMonth,
                      }).map(
                        (_, index) => {
                          const day =
                            index + 1;

                          const selected =
                            isSelected(
                              day,
                            );

                          return (
                            <button
                              key={day}
                              type="button"
                              onClick={() =>
                                handleDateSelect(
                                  day,
                                )
                              }
                              className={`flex size-8 items-center justify-center rounded-full text-xs ${
                                selected
                                  ? "bg-primary text-primary-foreground"
                                  : "hover:bg-muted"
                              }`}
                            >
                              {day}
                            </button>
                          );
                        },
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Labels */}
              <div className="flex items-start justify-between gap-4">
                <span className="text-muted-foreground">
                  Labels
                </span>

                <div className="flex flex-wrap justify-end gap-1">
                  {task.tags.map(
                    (tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() =>
                          updateTask(
                            task.id,
                            {
                              tags: task.tags.filter(
                                (
                                  currentTag,
                                ) =>
                                  currentTag !==
                                  tag,
                              ),
                            },
                          )
                        }
                        className="rounded-full bg-muted px-2 py-1 text-xs hover:bg-destructive/10"
                      >
                        {tag} ×
                      </button>
                    ),
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      const newTag =
                        window.prompt(
                          "Enter label",
                        );

                      if (
                        newTag &&
                        !task.tags.includes(
                          newTag,
                        )
                      ) {
                        updateTask(
                          task.id,
                          {
                            tags: [
                              ...task.tags,
                              newTag,
                            ],
                          },
                        );
                      }
                    }}
                    className="rounded-full border border-border px-2 py-1 text-xs"
                  >
                    + Add
                  </button>
                </div>
              </div>

              {/* Teams */}
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Teams
                </span>

                <span>—</span>
              </div>

              {/* Reporter */}
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Reporter
                </span>

                <span>—</span>
              </div>
            </div>
          </div>

          {/* ================================================== */}
          {/* REAL UPDATES */}
          {/* ================================================== */}

          <div className="mt-4 rounded-lg border border-border bg-card">
            <div className="border-b border-border px-4 py-3">
              <h2 className="text-sm font-semibold">
                Updates
              </h2>
            </div>

            <div>
              {task.activities &&
              task.activities.length > 0 ? (
                [...task.activities]
                  .reverse()
                  .map(
                    (
                      activity,
                      index,
                    ) => (
                      <div
                        key={
                          activity._id ??
                          index
                        }
                        className="border-b border-border p-4 last:border-b-0"
                      >
                        <div className="flex items-start gap-2">
                          <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs">
                            Y
                          </div>

                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2 text-xs">
                              <span className="font-medium">
                                You
                              </span>

                              <span className="text-muted-foreground">
                                {formatActivityTime(
                                  activity.createdAt,
                                )}
                              </span>
                            </div>

                            <p className="mt-2 text-xs leading-5">
                              {
                                activity.message
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    ),
                  )
              ) : (
                <p className="p-4 text-xs text-muted-foreground">
                  No updates yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}