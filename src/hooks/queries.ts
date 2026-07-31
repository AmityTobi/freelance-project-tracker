import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import * as api from "../api/clients";
import {
  Client,
  ClientData,
  Project,
  ProjectData,
  Task,
  TaskData,
} from "../types/client";

const CLIENTS_KEY = ["clients"];

export function useClients() {
  return useQuery({
    queryKey: CLIENTS_KEY,
    queryFn: api.fetchClients,
  });
}

export function useAddClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (clientData: ClientData) => api.createClient(clientData),

    // Optimistic add so the sidebar updates immediately, before the server responds
    onMutate: async (clientData) => {
      await queryClient.cancelQueries({ queryKey: CLIENTS_KEY });
      const previous = queryClient.getQueryData<Client[]>(CLIENTS_KEY);

      const optimisticClient: Client = {
        id: `optimistic-${crypto.randomUUID()}`,
        ...clientData,
        projects: [],
      };

      queryClient.setQueryData<Client[]>(CLIENTS_KEY, (old) => [
        ...(old ?? []),
        optimisticClient,
      ]);

      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(CLIENTS_KEY, context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: CLIENTS_KEY });
    },
  });
}

export function useDeleteClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (clientId: string) => api.deleteClient(clientId),

    // Optimistic remove so the client disappears from the sidebar instantly
    onMutate: async (clientId) => {
      await queryClient.cancelQueries({ queryKey: CLIENTS_KEY });
      const previous = queryClient.getQueryData<Client[]>(CLIENTS_KEY);

      queryClient.setQueryData<Client[]>(CLIENTS_KEY, (old) =>
        old?.filter((client) => client.id !== clientId),
      );

      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(CLIENTS_KEY, context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: CLIENTS_KEY });
    },
  });
}

export function useAddProject(clientId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectData: ProjectData) =>
      api.createProject(clientId, projectData),

    // Optimistic add so the new project card appears instantly
    onMutate: async (projectData) => {
      await queryClient.cancelQueries({ queryKey: CLIENTS_KEY });
      const previous = queryClient.getQueryData<Client[]>(CLIENTS_KEY);

      const optimisticProject: Project = {
        id: `optimistic-${crypto.randomUUID()}`,
        title: projectData.title,
        dueDate: projectData.dueDate ?? null,
        tasks: [],
      };

      queryClient.setQueryData<Client[]>(CLIENTS_KEY, (old) =>
        old?.map((client) =>
          client.id === clientId
            ? { ...client, projects: [...client.projects, optimisticProject] }
            : client,
        ),
      );

      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(CLIENTS_KEY, context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: CLIENTS_KEY });
    },
  });
}

export function useDeleteProject(clientId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectId: string) => api.deleteProject(clientId, projectId),

    // Optimistic remove so the project card disappears instantly
    onMutate: async (projectId) => {
      await queryClient.cancelQueries({ queryKey: CLIENTS_KEY });
      const previous = queryClient.getQueryData<Client[]>(CLIENTS_KEY);

      queryClient.setQueryData<Client[]>(CLIENTS_KEY, (old) =>
        old?.map((client) =>
          client.id === clientId
            ? {
                ...client,
                projects: client.projects.filter((p) => p.id !== projectId),
              }
            : client,
        ),
      );

      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(CLIENTS_KEY, context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: CLIENTS_KEY });
    },
  });
}

export function useAddTask(clientId: string, projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskData: TaskData) =>
      api.createTask(clientId, projectId, taskData),

    // Optimistic add so the new task appears instantly
    onMutate: async (taskData) => {
      await queryClient.cancelQueries({ queryKey: CLIENTS_KEY });
      const previous = queryClient.getQueryData<Client[]>(CLIENTS_KEY);

      const optimisticTask: Task = {
        id: `optimistic-${crypto.randomUUID()}`,
        title: taskData.title,
        completed: false,
      };

      queryClient.setQueryData<Client[]>(CLIENTS_KEY, (old) =>
        old?.map((client) => {
          if (client.id !== clientId) return client;
          return {
            ...client,
            projects: client.projects.map((project) =>
              project.id === projectId
                ? { ...project, tasks: [...project.tasks, optimisticTask] }
                : project,
            ),
          };
        }),
      );

      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(CLIENTS_KEY, context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: CLIENTS_KEY });
    },
  });
}

export function useToggleTask(clientId: string, projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      taskId,
      completed,
    }: {
      taskId: string;
      completed: boolean;
    }) => api.toggleTask(clientId, projectId, taskId, completed),

    // Optimistic update so the checkbox feels instant
    onMutate: async ({ taskId, completed }) => {
      await queryClient.cancelQueries({ queryKey: CLIENTS_KEY });
      const previous = queryClient.getQueryData<Client[]>(CLIENTS_KEY);

      queryClient.setQueryData<Client[]>(CLIENTS_KEY, (old) =>
        old?.map((client) => {
          if (client.id !== clientId) return client;
          return {
            ...client,
            projects: client.projects.map((project) => {
              if (project.id !== projectId) return project;
              return {
                ...project,
                tasks: project.tasks.map((task) =>
                  task.id === taskId ? { ...task, completed } : task,
                ),
              };
            }),
          };
        }),
      );

      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(CLIENTS_KEY, context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: CLIENTS_KEY });
    },
  });
}

export function useDeleteTask(clientId: string, projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskId: string) => api.deleteTask(clientId, projectId, taskId),

    // Optimistic remove so the task disappears instantly
    onMutate: async (taskId) => {
      await queryClient.cancelQueries({ queryKey: CLIENTS_KEY });
      const previous = queryClient.getQueryData<Client[]>(CLIENTS_KEY);

      queryClient.setQueryData<Client[]>(CLIENTS_KEY, (old) =>
        old?.map((client) => {
          if (client.id !== clientId) return client;
          return {
            ...client,
            projects: client.projects.map((project) => {
              if (project.id !== projectId) return project;
              return {
                ...project,
                tasks: project.tasks.filter((task) => task.id !== taskId),
              };
            }),
          };
        }),
      );

      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(CLIENTS_KEY, context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: CLIENTS_KEY });
    },
  });
}

export function useReorderTasks(clientId: string, projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskIds: string[]) =>
      api.reorderTasks(clientId, projectId, taskIds),

    // Optimistic reorder so drag-and-drop feels instant
    onMutate: async (taskIds) => {
      await queryClient.cancelQueries({ queryKey: CLIENTS_KEY });
      const previous = queryClient.getQueryData<Client[]>(CLIENTS_KEY);

      queryClient.setQueryData<Client[]>(CLIENTS_KEY, (old) =>
        old?.map((client) => {
          if (client.id !== clientId) return client;
          return {
            ...client,
            projects: client.projects.map((project) => {
              if (project.id !== projectId) return project;
              const taskMap = new Map(
                project.tasks.map((task) => [task.id, task]),
              );
              return {
                ...project,
                tasks: taskIds
                  .map((id) => taskMap.get(id))
                  .filter((task) => task !== undefined),
              };
            }),
          };
        }),
      );

      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(CLIENTS_KEY, context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: CLIENTS_KEY });
    },
  });
}
