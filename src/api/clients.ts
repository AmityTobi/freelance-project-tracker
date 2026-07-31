import { Client, ClientData, Project, ProjectData, Task, TaskData } from "../types/client";

const BASE_URL = "http://localhost:3001/api";

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${url}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.message ?? "Something went wrong");
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

// ---------- Clients ----------

export function fetchClients(): Promise<Client[]> {
  return request<Client[]>("/clients");
}

export function createClient(clientData: ClientData): Promise<Client> {
  return request<Client>("/clients", {
    method: "POST",
    body: JSON.stringify(clientData),
  });
}

export function deleteClient(clientId: string): Promise<void> {
  return request<void>(`/clients/${clientId}`, { method: "DELETE" });
}

// ---------- Projects ----------

export function createProject(
  clientId: string,
  projectData: ProjectData,
): Promise<Project> {
  return request<Project>(`/clients/${clientId}/projects`, {
    method: "POST",
    body: JSON.stringify(projectData),
  });
}

export function deleteProject(
  clientId: string,
  projectId: string,
): Promise<void> {
  return request<void>(`/clients/${clientId}/projects/${projectId}`, {
    method: "DELETE",
  });
}

// ---------- Tasks ----------

export function createTask(
  clientId: string,
  projectId: string,
  taskData: TaskData,
): Promise<Task> {
  return request<Task>(`/clients/${clientId}/projects/${projectId}/tasks`, {
    method: "POST",
    body: JSON.stringify(taskData),
  });
}

export function toggleTask(
  clientId: string,
  projectId: string,
  taskId: string,
  completed: boolean,
): Promise<Task> {
  return request<Task>(
    `/clients/${clientId}/projects/${projectId}/tasks/${taskId}`,
    {
      method: "PATCH",
      body: JSON.stringify({ completed }),
    },
  );
}

export function deleteTask(
  clientId: string,
  projectId: string,
  taskId: string,
): Promise<void> {
  return request<void>(
    `/clients/${clientId}/projects/${projectId}/tasks/${taskId}`,
    { method: "DELETE" },
  );
}

export function reorderTasks(
  clientId: string,
  projectId: string,
  taskIds: string[],
): Promise<Task[]> {
  return request<Task[]>(
    `/clients/${clientId}/projects/${projectId}/tasks/reorder`,
    {
      method: "PATCH",
      body: JSON.stringify({ taskIds }),
    },
  );
}
