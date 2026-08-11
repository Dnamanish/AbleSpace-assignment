export type Task = {
  id: number;
  title: string;
  description: string;
  assignee: string;
  date: string;
  tags: string[];
  status: string;
  priority: string;
};