import { useEffect, useState } from "react";

import Client from "./components/Clients/ClientList.jsx";
import { saveClient } from "./util/api.js";

function App() {
  const [clients, setClients] = useState(() => {
    const data = localStorage.getItem("clients");
    return data ? JSON.parse(data) : [];
  });
  const [selectedClientId, setSelectedClientId] = useState(null);

  // Check active projectId & never resets to null
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  // Toggles open/closed
  const [activeProjectId, setActiveProjectId] = useState(null);

  // Handling Project Form state
  const [isAddingProject, setIsAddingProject] = useState(false);

  //Handling Async
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const selectedClient = clients.find(
    (client) => client.id === selectedClientId,
  );

  // Persist Data
  useEffect(() => {
    localStorage.setItem("clients", JSON.stringify(clients));
  }, [clients]);

  // Add Client
  async function handleAddClient(clientData, onSuccess, addOptimisticClients) {
    //Update UI immediately
    addOptimisticClients({
      id: crypto.randomUUID(),
      ...clientData,
      projects: [],
    });

    onSuccess(); // Close form immediately

    try {
      setError(null);
      await saveClient(clientData);
      setClients((prev) => {
        return [
          ...prev,
          {
            id: crypto.randomUUID(),
            ...clientData,
            projects: [],
          },
        ];
      });
    } catch (error) {
      setError(error.message);
      setTimeout(() => setError(null), 2000);
    }
  }

  //Delete Client
  function handleDeleteClient(clientId) {
    setClients((prevState) =>
      prevState.filter((client) => client.id !== clientId),
    );

    if (clientId === selectedClientId) {
      setSelectedClientId(null);
    }
  }

  // Add Project to Client
  function handleAddProject(projectData) {
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
  function handleDeleteProject(projectId) {
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
  function handleAddTask(taskData) {
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
  function handleToggleTask(projectId, taskId) {
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
  function handleDeleteTask(projectId, taskId) {
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
  function handleSelectClient(id) {
    setSelectedClientId(id);
    setIsAddingProject(false);
  }

  // Toggle Task-Form display
  function handleSelectTaskId(id) {
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
    <>
      <Client
        clients={clients}
        onAddClient={handleAddClient}
        onSelectClient={handleSelectClient}
        onDeleteClient={handleDeleteClient}
        selectedId={selectedClientId}
        selectedClient={selectedClient}
        onAddProject={handleAddProject}
        isAddingProject={isAddingProject}
        onOpenProjectForm={handleOpenProjectForm}
        onCloseProjectForm={handleCloseProjectForm}
        onSelectProject={handleSelectTaskId}
        activeProjectId={activeProjectId}
        onAddTask={handleAddTask}
        onToggleTask={handleToggleTask}
        onDeleteTask={handleDeleteTask}
        onDeleteProject={handleDeleteProject}
        isLoading={isLoading}
        error={error}
      />
    </>
  );
}

export default App;
