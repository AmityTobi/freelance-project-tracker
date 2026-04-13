import { useState } from "react";
import ClientForm from "./ClientForm.jsx";
import ProjectForm from "../Projects/ProjectForm.jsx";

export default function Client({
  clients,
  onAddClient,
  onSelectClient,
  selectedId,
  selectedClient,
  onAddProject,
  isAddingProject,
  onOpenProjectForm,
  onCloseProjectForm,
}) {
  const [isAdding, setIsAdding] = useState(false); // Handling Client Form state

  // State updating function
  function handleOpenForm() {
    setIsAdding(true);
  }
  function handleCloseForm() {
    setIsAdding(false);
  }

  return (
    <main>
      <h1>Freelance Project Tracker</h1>
      {clients.length === 0 ? (
        <p>No clients yet. Add one.</p>
      ) : (
        <p>Select a client to get started</p>
      )}

      <ul>
        {clients.map((item) => {
          const isSelected = item.id === selectedId;
          return (
            <li
              key={item.id}
              onClick={() => onSelectClient(item.id)}
              className={isSelected ? "active" : ""}
            >
              <strong>{item.fullName}</strong>
            </li>
          );
        })}
      </ul>
      <button onClick={handleOpenForm}>Add Client</button>

      {isAdding && (
        <ClientForm onAddClient={onAddClient} onClose={handleCloseForm} />
      )}

      {!selectedClient && <p>No clients selected</p>}

      {selectedClient && (
        <>
          <h2>projects for {selectedClient.fullName} </h2>

          <button onClick={onOpenProjectForm}>Add Project</button>

          {selectedClient.projects.length === 0 ? (
            <p>No project in the list</p>
          ) : (
            <ul>
              {selectedClient.projects.map((project) => (
                <li key={project.id}>{project.title}</li>
              ))}
            </ul>
          )}

          {isAddingProject && (
            <ProjectForm
              onAddProject={onAddProject}
              onClose={onCloseProjectForm}
            />
          )}
        </>
      )}
    </main>
  );
}
