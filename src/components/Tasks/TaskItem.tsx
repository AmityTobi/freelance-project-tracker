import { useRef } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import Modal, { ModalHandle } from "../UI/Modal";
import Button from "../UI/Button";
import { useToggleTask, useDeleteTask } from "../../hooks/queries";
import { Task } from "../../types/client";

interface TaskItemProps {
  clientId: string;
  projectId: string;
  task: Task;
}

export default function TaskItem({ task, projectId, clientId }: TaskItemProps) {
  const { mutate: toggleTask } = useToggleTask(clientId, projectId);
  const { mutate: deleteTask } = useDeleteTask(clientId, projectId);

  const modalRef = useRef<ModalHandle>(null);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  function showModal() {
    modalRef.current?.show();
  }

  function handleToggle() {
    toggleTask({ taskId: task.id, completed: !task.completed });
  }

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`task-item ${task.completed ? "done" : ""}`}
    >
      <Modal
        ref={modalRef}
        onConfirm={() => {
          deleteTask(task.id);
          modalRef.current?.close();
        }}
        onCancel={() => modalRef.current?.close()}
        message="Are you sure you want to delete this task?"
      />

      <span className="drag-handle" {...attributes} {...listeners}>
        ⠿
      </span>

      <span className="task-check" onClick={handleToggle}>
        {task.completed ? "✓" : "○"}
      </span>
      <span className="task-desc" onClick={handleToggle}>
        {task.title}
      </span>

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
