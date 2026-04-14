import { useState } from "react";

import Client from "./components/Clients/ClientList";

function App() {
  const [clients, setClients] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState(null);

  // Check active projectId
  const [selectedProjectId, setSelectedProjectId] = useState(null);

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
        ...clientData, //User data from form
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

  // Set client-ID
  function handleSelectClient(id) {
    setSelectedClientId(id);
    setIsAddingProject(false);
  }

  // Toggle Task-Form display
  function handleSelectTaskId(id) {
    selectedProjectId === id
      ? setSelectedProjectId(null)
      : setSelectedProjectId(id);
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
        activeProjectId={selectedProjectId}
        onAddTask={handleAddTask}
      />
    </>
  );
}

export default App;
