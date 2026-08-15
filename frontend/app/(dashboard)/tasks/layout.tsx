import { TaskProvider } from "@/features/tasks/TaskProvider";

export default function TasksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TaskProvider>{children}</TaskProvider>;
}