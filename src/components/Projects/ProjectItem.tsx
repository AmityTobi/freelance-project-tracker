import { useRef } from "react";

import TaskList from "../Tasks/TaskList";
import TaskForm from "../Tasks/TaskForm";
import Modal, { ModalHandle } from "../UI/Modal";
import Button from "../UI/Button";
import ProgressBar from "../UI/ProgressBar";
import { useAppContext } from "../../store/AppContext";
import { useDeleteProject } from "../../hooks/queries";
import { Project } from "../../types/client";
import {
  formatDueDate,
  getProjectProgress,
  isOverdue,
  isProjectComplete,
} from "../../util/dates";

interface ProjectItemProps {
  project: Project;
  clientId: string;
}

export default function ProjectItem({ project, clientId }: ProjectItemProps) {
  const { activeProjectId, onToggleTaskForm } = useAppContext();
  const { mutate: deleteProject } = useDeleteProject(clientId);

  const modalRef = useRef<ModalHandle>(null);

  function showModal() {
    modalRef.current?.show();
  }

  const progress = getProjectProgress(project);
  const overdue = isOverdue(project.dueDate, isProjectComplete(project));
  const dueDateLabel = formatDueDate(project.dueDate);

  return (
    <li className="project-card">
      <Modal
        ref={modalRef}
        onConfirm={() => {
          deleteProject(project.id);
          modalRef.current?.close();
        }}
        onCancel={() => modalRef.current?.close()}
        message="Are you sure you want to delete the Project?"
      />

      {/* PROJECT HEADER */}
      <div className="project-header">
        <div className="project-title-group">
          <h3 className="project-title">{project.title}</h3>
          {dueDateLabel && (
            <span className={`due-date-badge ${overdue ? "overdue" : ""}`}>
              {overdue ? "⚠ Overdue: " : "Due "}
              {dueDateLabel}
            </span>
          )}
        </div>
        <div className="project-actions">
          <Button
            variant="ghost"
            className="btn-sm"
            onClick={() => onToggleTaskForm(project.id)}
          >
            + Task
          </Button>

          <Button variant="danger" className="btn-sm" onClick={showModal}>
            Delete
          </Button>
        </div>
      </div>

      {project.tasks.length > 0 && <ProgressBar percent={progress} />}

      {/* TASKS */}
      <div className="task-section">
        <TaskList
          tasks={project.tasks}
          projectId={project.id}
          clientId={clientId}
        />
      </div>

      {/* TASK FORM */}
      {project.id === activeProjectId && (
        <TaskForm
          clientId={clientId}
          projectId={project.id}
          onClose={() => onToggleTaskForm(project.id)}
        />
      )}
    </li>
  );
}
