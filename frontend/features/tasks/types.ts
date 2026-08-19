export type TaskActivity = {
  _id?: string;
  type:
    | "status"
    | "priority"
    | "date"
    | "labels"
    | "comment";
  message: string;
  createdAt: string;
};

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

  activities: TaskActivity[];
};