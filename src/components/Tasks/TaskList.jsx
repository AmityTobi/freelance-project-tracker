import TaskItem from "./TaskItem.jsx";

export default function TaskList({ tasks, projectId }) {
  if (tasks.length === 0) {
    return <p className="no-task">No tasks yet</p>;
  }

  return (
    <>
      <div className="section-label" style={{ marginBottom: "6px" }}>
        {tasks.length === 1 ? "Task" : "Tasks"}
      </div>
      <ul className="task-list">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} projectId={projectId} />
        ))}
      </ul>
    </>
  );
}
