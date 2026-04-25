import { useRef } from "react";

import TaskList from "../Tasks/TaskList.jsx";
import TaskForm from "../Tasks/TaskForm.jsx";
import Modal from "../UI/Modal.jsx";

export default function ProjectItem({
  project,
  activeProjectId,
  onSelectProject,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  onDeleteProject,
}) {
  const modalRef = useRef();

  function showModal() {
    modalRef.current.show();
  }

  return (
    <li className="project-card">
      <Modal
        ref={modalRef}
        onConfirm={() => {
          onDeleteProject(project.id);
          modalRef.current.close();
        }}
        onCancel={() => modalRef.current.close()}
        message="Are you sure you want to delete the Project?"
      />

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
            <button className="btn btn-danger btn-sm" onClick={showModal}>
              Delete
            </button>
          )}
        </div>
      </div>

      {/* TASKS */}
      <div className="task-section">
        <TaskList
          tasks={project.tasks}
          projectId={project.id}
          onToggleTask={onToggleTask}
          onDeleteTask={onDeleteTask}
        />
      </div>

      {/* TASK FORM */}
      {project.id === activeProjectId && (
        <TaskForm
          onAddTask={onAddTask}
          onClose={() => onSelectProject(project.id)}
        />
      )}
    </li>
  );
}
