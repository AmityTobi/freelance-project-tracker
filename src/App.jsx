import { useState } from "react";

import Client from "./components/Clients/ClientList";

function App() {
  const [clients, setClients] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState(null);

  // Check active projectId & never resets to null
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  // Toggles open/closed
  const [activeProjectId, setActiveProjectId] = useState(null);

  // Handling Project Form state
  const [isAddingProject, setIsAddingProject] = useState(false);

  const selectedClient = clients.find(
    (client) => client.id === selectedClientId,
  );

  // Add Client
  function handleAddClient(clientData) {
    setClients((prevState) => [
      ...prevState,
      {
        id: crypto.randomUUID(),
        ...clientData, //Client data from form
        projects: [],
      },
    ]);
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
    console.log("taskId received:", taskId);
    console.log("selectedProjectId:", selectedProjectId);
    console.log("selectedClientId:", selectedClientId);
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
      />
    </>
  );
}

export default App;
