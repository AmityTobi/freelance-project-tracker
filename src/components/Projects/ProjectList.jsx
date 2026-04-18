import ProjectItem from "./ProjectItem.jsx";

export default function ProjectList({
  projects,
  activeProjectId,
  onSelectProject,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  onDeleteProject,
}) {
  if (projects.length === 0) {
    return <p className="empty-hint">No projects yet. Add one above.</p>;
  }

  return (
    <ul className="project-list">
      {projects.map((project) => (
        <ProjectItem
          key={project.id}
          project={project}
          activeProjectId={activeProjectId}
          onSelectProject={onSelectProject}
          onAddTask={onAddTask}
          onToggleTask={onToggleTask}
          onDeleteTask={onDeleteTask}
          onDeleteProject={onDeleteProject}
        />
      ))}
    </ul>
  );
}
