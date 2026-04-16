import { useState } from "react";
import ClientForm from "./ClientForm.jsx";
import ProjectForm from "../Projects/ProjectForm.jsx";
import TaskForm from "../Tasks/TaskForm.jsx";

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
  onSelectProject,
  activeProjectId,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  onDeleteProject,
}) {
  const [isAdding, setIsAdding] = useState(false);

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

          {clients.length === 0 ? (
            <p className="empty-hint">No clients yet.</p>
          ) : (
            <ul className="client-list">
              {clients.map((item) => {
                const isSelected = item.id === selectedId;
                return (
                  <li
                    key={item.id}
                    onClick={() => onSelectClient(item.id)}
                    className={`client-item ${isSelected ? "active" : ""}`}
                  >
                    <span className="client-avatar">
                      {item.fullName.charAt(0).toUpperCase()}
                    </span>
                    <span className="client-name">{item.fullName}</span>
                  </li>
                );
              })}
            </ul>
          )}

          <button className="btn btn-ghost btn-full" onClick={handleOpenForm}>
            + Add client
          </button>

          {isAdding && (
            <ClientForm onAddClient={onAddClient} onClose={handleCloseForm} />
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

              {/* PROJECTS */}
              {selectedClient.projects.length === 0 ? (
                <p className="empty-hint">No projects yet. Add one above.</p>
              ) : (
                <ul className="project-list">
                  {selectedClient.projects.map((project) => (
                    <li key={project.id} className="project-card">
                      {/* PROJECT HEADER */}
                      <div className="project-header">
                        <h3 className="project-title">{project.title}</h3>
                        <div className="project-actions">
                          <button
                            className="btn btn-ghost btn-sm"
                            onClick={() => onSelectProject(project.id)}
                          >
                            + Task
                          </button>
                          {onDeleteProject && (
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => onDeleteProject(project.id)}
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </div>

                      {/* TASKS */}
                      <div className="task-section">
                        {project.tasks.length === 0 ? (
                          <p className="no-task">No tasks yet</p>
                        ) : (
                          <>
                            <div
                              className="section-label"
                              style={{ marginBottom: "6px" }}
                            >
                              {project.tasks.length === 1 ? "Task" : "Tasks"}
                            </div>
                            <ul className="task-list">
                              {project.tasks.map((task) => (
                                <li
                                  key={task.id}
                                  className={`task-item ${task.completed ? "done" : ""}`}
                                  onClick={() =>
                                    onToggleTask(project.id, task.id)
                                  }
                                >
                                  <span className="task-check">
                                    {task.completed ? "✓" : "○"}
                                  </span>
                                  <span className="task-desc">{task.desc}</span>
                                  {onDeleteTask && (
                                    <button
                                      className="btn btn-danger btn-xs"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        onDeleteTask(project.id, task.id);
                                      }}
                                    >
                                      ✕
                                    </button>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </div>

                      {/* TASK FORM */}
                      {project.id === activeProjectId && (
                        <TaskForm
                          onAddTask={onAddTask}
                          onClose={() => onSelectProject(project.id)}
                        />
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </section>
      </div>
    </main>
  );
}
