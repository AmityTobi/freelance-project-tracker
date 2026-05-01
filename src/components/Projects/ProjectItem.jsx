import { useRef } from "react";

import TaskList from "../Tasks/TaskList.jsx";
import TaskForm from "../Tasks/TaskForm.jsx";
import Modal from "../UI/Modal.jsx";
import Button from "../UI/Button.jsx";
import { useAppContext } from "../../store/AppContext.jsx";

export default function ProjectItem({ project }) {
  const { activeProjectId, onSelectProject, onDeleteProject } = useAppContext();

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
          <Button
            variant="ghost"
            className="btn-sm"
            onClick={() => onSelectProject(project.id)}
          >
            + Task
          </Button>

          <Button variant="danger" className="btn-sm" onClick={showModal}>
            Delete
          </Button>
        </div>
      </div>

      {/* TASKS */}
      <div className="task-section">
        <TaskList tasks={project.tasks} projectId={project.id} />
      </div>

      {/* TASK FORM */}
      {project.id === activeProjectId && (
        <TaskForm onClose={() => onSelectProject(project.id)} />
      )}
    </li>
  );
}
