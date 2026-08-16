"use client";

import {
  CalendarDays,
  Lock,
  Eye,
  Share2,
  MoreHorizontal,
  Plus,
  Tag,
  Users,
  Paperclip,
  Send,
  ChevronDown,
  Settings,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useTasks } from "@/features/tasks/TaskProvider";
import { useState } from "react";

export default function TaskDetailPage() {
  const params = useParams();
  const { tasks, updateTask } = useTasks();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<string[]>([]);

  const taskId = params.id as string;

  const task = tasks.find((currentTask) => currentTask.id === taskId);

  if (!task) {
    return <div className="p-6">Task not found.</div>;
  }

  return (
    <div className="min-h-screen p-6">
      {/* Top */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{task.title}</h1>

          <p className="mt-2 max-w-2xl text-sm text-gray-500">
            {task.description}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex size-9 items-center justify-center rounded-md border">
            <Lock className="size-4" />
          </button>

          <button className="flex size-9 items-center justify-center gap-1 rounded-md border">
            <Eye className="size-4" />
            <span className="text-xs">1</span>
          </button>

          <button className="flex size-9 items-center justify-center rounded-md border">
            <Share2 className="size-4" />
          </button>

          <button className="flex size-9 items-center justify-center rounded-md border">
            <MoreHorizontal className="size-4" />
          </button>
        </div>
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-[1fr_300px] gap-6">
        {/* Left */}
        <div>
          {/* Properties */}
          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-4">
              <span className="w-16 text-gray-500">Properties</span>

              <span className="flex items-center gap-2">
                <span className="flex size-6 items-center justify-center rounded-full bg-gray-100 text-xs">
                  {task.assignee.charAt(0)}
                </span>

                {task.assignee}
              </span>

              <span className="flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs text-red-500">
                <CalendarDays className="size-3" />
                {task.date}
              </span>
            </div>

            {/* Labels */}
            <div className="flex items-start justify-between gap-4">
              <span className="text-gray-500">Labels</span>

              <div className="flex flex-wrap justify-end gap-1">
                {task.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-gray-100 px-2 py-1 text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Resources */}
            <div className="flex items-center gap-4">
              <span className="w-16 text-gray-500">Resources</span>

              <button className="text-sm text-gray-500">
                + Add document or link...
              </button>
            </div>
          </div>

          {/* Subtasks */}
          <div className="mt-8">
            <div className="mb-3 flex items-center gap-2">
              <ChevronDown className="size-4" />

              <h2 className="text-sm font-semibold">Subtasks</h2>
            </div>

            <div className="overflow-hidden rounded-lg border">
              {/* Header */}
              <div className="grid grid-cols-[1fr_120px_120px_120px_50px] bg-gray-50 px-3 py-3 text-xs">
                <span>Task</span>
                <span>Priority</span>
                <span>Members</span>
                <span>Due Date</span>
                <span>Actions</span>
              </div>

              {[
                ["Subtask 1", "High", "Admin", "12 Sep 2026"],
                ["Subtask 2", "Low", "CN", "15 Sep 2026"],
                ["Subtask 3", "Medium", "+", "18 Sep 2026"],
              ].map(([title, priority, member, date]) => (
                <div
                  key={title}
                  className="grid grid-cols-[1fr_120px_120px_120px_50px] items-center border-t px-3 py-3 text-sm"
                >
                  <span>{title}</span>

                  <span
                    className={
                      priority === "High"
                        ? "text-red-500"
                        : priority === "Medium"
                          ? "text-orange-500"
                          : "text-blue-400"
                    }
                  >
                    {priority}
                  </span>

                  <span>{member}</span>

                  <span>{date}</span>

                  <button>
                    <MoreHorizontal className="size-4" />
                  </button>
                </div>
              ))}

              <button className="flex w-full items-center gap-2 border-t px-3 py-3 text-sm">
                <Plus className="size-4" />
                Add Subtasks
              </button>
            </div>
          </div>

          {/* Updates */}
          <div className="mt-6">
            <h2 className="mb-3 text-sm font-semibold">Updates</h2>

            <div className="rounded-lg border">
              <div className="border-b p-4">
                <div className="flex items-center gap-2 text-sm">
                  <div className="size-7 rounded-full bg-gray-200" />

                  <span className="font-medium">Ankit Dutta</span>

                  <span className="text-xs text-gray-400">just now</span>
                </div>

                <p className="mt-3 text-sm">dsds</p>
              </div>

              <div className="flex items-center gap-2 p-3">
                <div className="size-7 rounded-full bg-gray-200" />

                <input
                  placeholder="Leave a reply..."
                  className="flex-1 text-sm outline-none"
                />

                <Paperclip className="size-4 text-gray-500" />
                <Send className="size-4 text-gray-500" />
              </div>
            </div>

            <div className="mt-3">
              {comments.map((item, index) => (
                <div key={index} className="mb-2 rounded-lg border p-3 text-sm">
                  {item}
                </div>
              ))}

              <div className="flex items-center gap-2 rounded-lg border p-3">
                <input
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && comment.trim()) {
                      setComments((current) => [...current, comment.trim()]);
                      setComment("");
                    }
                  }}
                  placeholder="Add a comment..."
                  className="flex-1 text-sm outline-none"
                />

                <Paperclip className="size-4 text-gray-500" />

                <button
                  type="button"
                  onClick={() => {
                    if (!comment.trim()) return;

                    setComments((current) => [...current, comment.trim()]);
                    setComment("");
                  }}
                >
                  <Send className="size-4 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Details */}
        <div>
          <div className="rounded-lg border">
            <div className="flex items-center justify-between border-b px-4 py-3">
              <div className="flex items-center gap-2">
                <ChevronDown className="size-4" />

                <h2 className="text-sm font-semibold">Details</h2>
              </div>

              <div className="flex items-center gap-2">
                <Plus className="size-4" />
                <Settings className="size-4" />
              </div>
            </div>

            <div className="space-y-5 p-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Status</span>

                <select
                  value={task.status}
                  onChange={(e) => {
                    updateTask(task.id, {
                      status: e.target.value,
                    });
                  }}
                  className="rounded-md border px-3 py-1.5 text-sm outline-none"
                >
                  <option value="To Do">To Do</option>
                  <option value="Doing">Doing</option>
                  <option value="Completed">Completed</option>
                  <option value="On Hold">On Hold</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-500">Priority</span>

                <select
                  value={task.priority}
                  onChange={(e) => {
                    updateTask(task.id, {
                      priority: e.target.value,
                    });
                  }}
                  className="rounded-md border px-3 py-1.5 text-sm outline-none"
                >
                  <option value="No Priority">No Priority</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Members</span>

                <span className="flex items-center gap-1">
                  <Users className="size-3.5" />
                  {task.assignee}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Dates</span>

                <span className="text-xs">Due {task.dueDate}</span>
              </div>

              <div className="flex items-start justify-between gap-4">
                <span className="text-gray-500">Labels</span>

                <div className="flex flex-wrap justify-end gap-1">
                  {task.tags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => {
                        updateTask(task.id, {
                          tags: task.tags.filter(
                            (currentTag) => currentTag !== tag,
                          ),
                        });
                      }}
                      className="rounded-full bg-gray-100 px-2 py-1 text-xs hover:bg-red-100"
                    >
                      {tag} ×
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => {
                      const newTag = window.prompt("Enter label");

                      if (newTag && !task.tags.includes(newTag)) {
                        updateTask(task.id, {
                          tags: [...task.tags, newTag],
                        });
                      }
                    }}
                    className="rounded-full border px-2 py-1 text-xs"
                  >
                    + Add
                  </button>
                </div>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Teams</span>

                <span>—</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Reporter</span>

                <span>—</span>
              </div>
            </div>
          </div>

          {/* Activity */}
          <div className="mt-4 rounded-lg border p-4">
            <h2 className="mb-4 text-sm font-semibold">Updates</h2>

            <p className="text-xs text-gray-500">
              You changed priority from No priority to Urgent
            </p>

            <p className="mt-4 text-xs text-gray-500">
              You posted an update · Aug 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
