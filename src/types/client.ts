export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export interface Project {
  id: string;
  tasks: Task[];
  title: string;
}

export interface Client {
  id: string;
  fullName: string;
  email: string;
  projects: Project[];
}

export type ProjectData = Omit<Project, "id" | "tasks">;
export type TaskData = Omit<Task, "id" | "completed">;
export type ClientData = Omit<Client, "id" | "projects">;
