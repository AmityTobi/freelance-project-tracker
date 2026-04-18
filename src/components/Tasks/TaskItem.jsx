export default function TaskItem({
  task,
  projectId,
  onToggleTask,
  onDeleteTask,
}) {
  return (
    <li
      className={`task-item ${task.completed ? "done" : ""}`}
      onClick={() => onToggleTask(projectId, task.id)}
    >
      <span className="task-check">{task.completed ? "✓" : "○"}</span>
      <span className="task-desc">{task.desc}</span>
      {onDeleteTask && (
        <button
          className="btn btn-danger btn-xs"
          onClick={(e) => {
            e.stopPropagation();
            onDeleteTask(projectId, task.id);
          }}
        >
          ✕
        </button>
      )}
    </li>
  );
}
