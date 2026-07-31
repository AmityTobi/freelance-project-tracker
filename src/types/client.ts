export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export interface Project {
  id: string;
  tasks: Task[];
  title: string;
  dueDate: string | null;
}

export interface Client {
  id: string;
  fullName: string;
  email: string;
  projects: Project[];
}

export type ProjectData = { title: string; dueDate?: string };
export type TaskData = Omit<Task, "id" | "completed">;
export type ClientData = Omit<Client, "id" | "projects">;

export type ProjectFilter = "all" | "active" | "completed" | "overdue";
