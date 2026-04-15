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
              {selectedClient.projects.map((project) => {
                return (
                  <li key={project.id}>
                    <h3>{project.title}</h3>

                    <button onClick={() => onSelectProject(project.id)}>
                      Add task
                    </button>

                    {project.tasks.length === 0 && <p>No task yet</p>}
                    {project.tasks.length > 0 && (
                      <h5>{project.tasks.length === 1 ? "Task:" : "Tasks:"}</h5>
                    )}

                    <ul>
                      {project.tasks.map((task) => (
                        <li
                          key={task.id}
                          onClick={() => onToggleTask(task.id)}
                          style={{
                            textDecoration: task.completed
                              ? "line-through"
                              : "none",
                          }}
                        >
                          {task.desc}
                        </li>
                      ))}
                    </ul>

                    {project.id === activeProjectId && (
                      <TaskForm
                        onAddTask={onAddTask}
                        onClose={() => onSelectProject(project.id)}
                      />
                    )}
                  </li>
                );
              })}
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
