import { useRef } from "react";

import Modal from "../UI/Modal";
import Button from "../UI/Button";

export default function TaskItem({
  task,
  projectId,
  onToggleTask,
  onDeleteTask,
}) {
  const modalRef = useRef();

  function showModal() {
    modalRef.current.show();
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
          modalRef.current.close();
        }}
        onCancel={() => modalRef.current.close()}
        message="Are you sure you want to delete this task?"
      />

      <span className="task-check">{task.completed ? "✓" : "○"}</span>
      <span className="task-desc">{task.desc}</span>

      {onDeleteTask && (
        <Button
          variant="danger"
          className="btn-xs"
          onClick={(e) => {
            e.stopPropagation();
            showModal();
          }}
        >
          ✕
        </Button>
      )}
    </li>
  );
}
