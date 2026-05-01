import { useOptimistic, useState } from "react";

import { useAppContext } from "../../store/AppContext.jsx";
import ClientItem from "./ClientItem.jsx";
import ClientForm from "./ClientForm.jsx";
import ProjectList from "../Projects/ProjectList.jsx";
import ProjectForm from "../Projects/ProjectForm.jsx";
import Button from "../UI/Button.jsx";

export default function ClientList() {
  const {
    clients,
    selectedClient,
    selectedClientId,
    onOpenProjectForm,
    isAddingProject,
    error,
  } = useAppContext();

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
                  isSelected={item.id === selectedClientId}
                />
              ))}
            </ul>
          )}
          {error && <p className="async-error">⚠️ {error}</p>}

          <Button variant="ghost" className="btn-full" onClick={handleOpenForm}>
            + Add client
          </Button>

          {isAdding && (
            <ClientForm
              addOptimisticClients={addOptimisticClients}
              handleCloseForm={handleCloseForm}
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
                <Button onClick={onOpenProjectForm}>+ Add project</Button>
              </div>

              {/* PROJECT FORM */}
              {isAddingProject && <ProjectForm />}

              {/* PROJECT LIST */}
              <ProjectList />
            </>
          )}
        </section>
      </div>
    </main>
  );
}
