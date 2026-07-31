import { createContext, useContext, useState } from "react";

import { ProjectFilter } from "../types/client";

interface AppProviderProps {
  children: React.ReactNode;
}

interface AppContextProps {
  activeProjectId: string | null;
  isAddingProject: boolean;
  searchTerm: string;
  projectFilter: ProjectFilter;

  onOpenProjectForm: () => void;
  onCloseProjectForm: () => void;
  onToggleTaskForm: (projectId: string) => void;
  onSetSearchTerm: (value: string) => void;
  onSetProjectFilter: (value: ProjectFilter) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export function AppProvider({ children }: AppProviderProps) {
  // Toggles which project's "add task" form is open
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  // Handling Project Form state
  const [isAddingProject, setIsAddingProject] = useState(false);

  // Search + filter (client-side, over already-fetched data)
  const [searchTerm, setSearchTerm] = useState("");
  const [projectFilter, setProjectFilter] = useState<ProjectFilter>("all");

  function handleOpenProjectForm() {
    setIsAddingProject(true);
  }

  function handleCloseProjectForm() {
    setIsAddingProject(false);
  }

  function handleToggleTaskForm(projectId: string) {
    setActiveProjectId((prev) => (prev === projectId ? null : projectId));
  }

  return (
    <AppContext.Provider
      value={{
        activeProjectId,
        isAddingProject,
        searchTerm,
        projectFilter,
        onOpenProjectForm: handleOpenProjectForm,
        onCloseProjectForm: handleCloseProjectForm,
        onToggleTaskForm: handleToggleTaskForm,
        onSetSearchTerm: setSearchTerm,
        onSetProjectFilter: setProjectFilter,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// useContext custom hook
export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context;
}
