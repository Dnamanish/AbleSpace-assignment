export type Task = {
  id: string;
  title: string;
  description: string;
  assignee: string;
  date: string;
  dueDate: string;
  tags: string[];
  status: string;
  priority: string;
};