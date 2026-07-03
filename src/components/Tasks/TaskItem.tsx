import { useRef } from "react";

import Modal from "../UI/Modal";
import Button from "../UI/Button";
import { useAppContext } from "../../store/AppContext";
import { ModalHandle } from "../UI/Modal";
import { Task } from "../../types/client";

interface TaskItemProps {
  projectId: string;
  task: Task;
}

export default function TaskItem({ task, projectId }: TaskItemProps) {
  const { onToggleTask, onDeleteTask } = useAppContext();

  const modalRef = useRef<ModalHandle>(null);

  function showModal() {
    modalRef.current?.show();
  }

  return (
    <li
      className={`task-item ${task.completed ? "done" : ""}`}
      onClick={() => onToggleTask(projectId, task.id)}
    >
      <Modal
        ref={modalRef}
        onConfirm={() => {
          onDeleteTask(projectId, task.id);
          modalRef.current?.close();
        }}
        onCancel={() => modalRef.current?.close()}
        message="Are you sure you want to delete this task?"
      />

      <span className="task-check">{task.completed ? "✓" : "○"}</span>
      <span className="task-desc">{task.title}</span>

      <Button
        variant="danger"
        className="btn-xs"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.stopPropagation();
          showModal();
        }}
      >
        ✕
      </Button>
    </li>
  );
}
