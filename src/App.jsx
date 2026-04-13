import { useState } from "react";

import Client from "./components/Clients/ClientList";

function App() {
  const [clients, setClients] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [isAddingProject, setIsAddingProject] = useState(false); // Handling Project Form state

  const selectedClient = clients.find(
    (client) => client.id === selectedClientId,
  );

  // Client updating function
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

  // Project Updating Function
  function handleAddProject(projectData) {
    setClients((prevState) =>
      prevState.map((client) => {
        if (client.id === selectedClientId) {
          return {
            ...client,

            projects: [
              ...client.projects,
              { id: crypto.randomUUID(), ...projectData },
            ],
          };
        }

        return client;
      }),
    );
  }

  function handleSelectClient(id) {
    setSelectedClientId(id);
    setIsAddingProject(false);
  }

  function handleOpenProjectForm() {
    setIsAddingProject(true);
  }

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
      />
    </>
  );
}

export default App;
