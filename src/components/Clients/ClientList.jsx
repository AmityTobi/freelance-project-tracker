import { useOptimistic, useState } from "react";
import ClientItem from "./ClientItem.jsx";
import ClientForm from "./ClientForm.jsx";
import ProjectList from "../Projects/ProjectList.jsx";
import ProjectForm from "../Projects/ProjectForm.jsx";

export default function ClientList({
  clients,
  onAddClient,
  onSelectClient,
  selectedId,
  selectedClient,
  onAddProject,
  isAddingProject,
  onOpenProjectForm,
  onCloseProjectForm,
  onSelectProject,
  activeProjectId,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  onDeleteProject,
  isLoading,
  error,
  onDeleteClient,
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [optimisticClients, addOptimisticClients] = useOptimistic(
    clients,
    (prevState, newClient) => [...prevState, newClient],
  );

  function handleOpenForm() {
    setIsAdding(true);
  }

  function handleCloseForm() {
    setIsAdding(false);
  }

  return (
    <main className="app-layout">
      <header className="app-header">
        <span className="app-logo">FPT</span>
        <h1 className="app-title">Freelance Project Tracker</h1>
      </header>

      <div className="layout-container">
        {/* ================= CLIENT SIDEBAR ================= */}
        <aside className="client-section">
          <div className="section-label">Clients</div>

          {optimisticClients.length === 0 ? (
            <p className="empty-hint">No clients yet.</p>
          ) : (
            <ul className="client-list">
              {optimisticClients.map((item) => (
                <ClientItem
                  key={item.id}
                  client={item}
                  isSelected={item.id === selectedId}
                  onSelectClient={onSelectClient}
                  onDeleteClient={onDeleteClient}
                />
              ))}
            </ul>
          )}
          {error && <p className="async-error">⚠️ {error}</p>}

          <button className="btn btn-ghost btn-full" onClick={handleOpenForm}>
            + Add client
          </button>

          {isAdding && (
            <ClientForm
              onAddClient={onAddClient}
              handleCloseForm={handleCloseForm}
              isLoading={isLoading}
              addOptimisticClients={addOptimisticClients}
            />
          )}
        </aside>

        {/* ================= MAIN PANEL ================= */}
        <section className="main-section">
          {!selectedClient && (
            <div className="empty-state">
              <div className="empty-icon">→</div>
              <p>
                Select a client to view their projects, or add a new client to
                get started.
              </p>
            </div>
          )}

          {selectedClient && (
            <>
              {/* CLIENT HEADER */}
              <div className="client-header">
                <div>
                  <div className="section-label">Selected client</div>
                  <h2 className="client-heading">{selectedClient.fullName}</h2>
                </div>
                <button className="btn btn-primary" onClick={onOpenProjectForm}>
                  + Add project
                </button>
              </div>

              {/* PROJECT FORM */}
              {isAddingProject && (
                <ProjectForm
                  onAddProject={onAddProject}
                  onClose={onCloseProjectForm}
                />
              )}

              {/* PROJECT LIST */}
              <ProjectList
                projects={selectedClient.projects}
                activeProjectId={activeProjectId}
                onSelectProject={onSelectProject}
                onAddTask={onAddTask}
                onToggleTask={onToggleTask}
                onDeleteTask={onDeleteTask}
                onDeleteProject={onDeleteProject}
              />
            </>
          )}
        </section>
      </div>
    </main>
  );
}
