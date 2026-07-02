import { createContext, useContext, useState, useEffect } from "react";

import { Client, ClientData, TaskData, ProjectData } from "../types/client";
import { saveClient } from "../util/api";

interface AppProviderProps {
  children: React.ReactNode;
}

interface AppContextProps {
  clients: Client[];
  selectedClient: Client | undefined;
  selectedClientId: string | null;
  activeProjectId: string | null;
  selectedProjectId: string | null;
  isAddingProject: boolean;
  isLoading: boolean;
  error: string | null;

  onAddClient: (
    clientData: ClientData,
    onSuccess: () => void,
    addOptimisticClients: (client: Client) => void,
  ) => Promise<void>;

  onDeleteClient: (clientId: string) => void;
  onSelectClient: (id: string) => void;
  onAddProject: (projectData: ProjectData) => void;
  onDeleteProject: (projectId: string) => void;
  onOpenProjectForm: () => void;
  onCloseProjectForm: () => void;
  onSelectProject: (id: string) => void;
  onAddTask: (taskData: TaskData) => void;
  onToggleTask: (projectId: string, taskId: string) => void;
  onDeleteTask: (projectId: string, taskId: string) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export function AppProvider({ children }: AppProviderProps) {
  const [clients, setClients] = useState<Client[]>(() => {
    const data = localStorage.getItem("clients");
    return data ? JSON.parse(data) : [];
  });
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);

  // Check active projectId & never resets to null
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null,
  );

  // Toggles open/closed
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  // Handling Project Form state
  const [isAddingProject, setIsAddingProject] = useState(false);

  //Handling Async
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedClient = clients.find(
    (client) => client.id === selectedClientId,
  );

  // Persist Data
  useEffect(() => {
    localStorage.setItem("clients", JSON.stringify(clients));
  }, [clients]);

  // Add Client
  async function handleAddClient(
    clientData: ClientData,
    onSuccess: () => void,
    addOptimisticClients: (client: Client) => void,
  ) {
    const newClient: Client = {
      id: crypto.randomUUID(),
      ...clientData,
      projects: [],
    };
    //Update UI immediately
    addOptimisticClients(newClient);

    onSuccess(); // Close form immediately

    try {
      setError(null);
      await saveClient(clientData);
      setClients((prev) => {
        return [...prev, newClient];
      });
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        setTimeout(() => setError(null), 2000);
      } else {
        setError("Something went wrong.");
      }
    }
  }

  //Delete Client
  function handleDeleteClient(clientId: string) {
    setClients((prevState) =>
      prevState.filter((client) => client.id !== clientId),
    );

    if (clientId === selectedClientId) {
      setSelectedClientId(null);
    }
  }

  // Add Project to Client
  function handleAddProject(projectData: ProjectData) {
    setClients((prevState) =>
      prevState.map((client) => {
        if (client.id === selectedClientId) {
          return {
            ...client,

            projects: [
              ...client.projects,
              { id: crypto.randomUUID(), tasks: [], ...projectData },
            ],
          };
        }

        return client;
      }),
    );
  }

  //Delete Project
  function handleDeleteProject(projectId: string) {
    setClients((prevState) =>
      prevState.map((client) => {
        if (client.id === selectedClientId) {
          return {
            ...client,
            projects: client.projects.filter(
              (project) => project.id !== projectId,
            ),
          };
        }

        return client;
      }),
    );

    // cleanup AFTER
    if (projectId === selectedProjectId) {
      setSelectedProjectId(null);
    }

    if (projectId === activeProjectId) {
      setActiveProjectId(null);
    }
  }

  // Add Task to project
  function handleAddTask(taskData: TaskData) {
    setClients((prevState) => {
      return prevState.map((client) => {
        if (client.id !== selectedClientId) return client;

        return {
          ...client,
          projects: client.projects.map((project) => {
            if (project.id !== selectedProjectId) return project;

            return {
              ...project,
              tasks: [
                ...project.tasks,
                { id: crypto.randomUUID(), completed: false, ...taskData },
              ],
            };
          }),
        };
      });
    });
  }

  // Toggle task completed
  function handleToggleTask(projectId: string, taskId: string) {
    setClients((prevState) => {
      return prevState.map((client) => {
        if (client.id !== selectedClientId) return client;

        return {
          ...client,
          projects: client.projects.map((project) => {
            if (project.id !== projectId) return project;

            return {
              ...project,
              tasks: project.tasks.map((task) => {
                if (task.id !== taskId) return task;

                return {
                  ...task,
                  completed: !task.completed,
                };
              }),
            };
          }),
        };
      });
    });
  }

  // Delete task
  function handleDeleteTask(projectId: string, taskId: string) {
    setClients((prevState) => {
      return prevState.map((client) => {
        if (client.id !== selectedClientId) return client;

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
      });
    });
  }

  // Set client-ID
  function handleSelectClient(id: string) {
    setSelectedClientId(id);
    setIsAddingProject(false);
  }

  // Toggle Task-Form display
  function handleSelectTaskId(id: string) {
    setSelectedProjectId(id);

    activeProjectId === id ? setActiveProjectId(null) : setActiveProjectId(id);
  }

  // Open project form
  function handleOpenProjectForm() {
    setIsAddingProject(true);
  }

  // Close project form
  function handleCloseProjectForm() {
    setIsAddingProject(false);
  }

  return (
    <AppContext.Provider
      value={{
        clients,
        selectedClient,
        selectedClientId,
        activeProjectId,
        selectedProjectId,
        isAddingProject,
        isLoading,
        error,
        onAddClient: handleAddClient,
        onDeleteClient: handleDeleteClient,
        onSelectClient: handleSelectClient,
        onAddProject: handleAddProject,
        onDeleteProject: handleDeleteProject,
        onOpenProjectForm: handleOpenProjectForm,
        onCloseProjectForm: handleCloseProjectForm,
        onSelectProject: handleSelectTaskId,
        onAddTask: handleAddTask,
        onToggleTask: handleToggleTask,
        onDeleteTask: handleDeleteTask,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

//useContext custom hook
export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context;
}
