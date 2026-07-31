import { useAppContext } from "../../store/AppContext";
import { isOverdue, isProjectComplete } from "../../util/dates";
import { Project } from "../../types/client";
import ProjectItem from "./ProjectItem";

interface ProjectListProps {
  clientId: string;
  projects: Project[];
}

export default function ProjectList({ clientId, projects }: ProjectListProps) {
  const { projectFilter } = useAppContext();

  const filteredProjects = projects.filter((project) => {
    switch (projectFilter) {
      case "active":
        return !isProjectComplete(project);
      case "completed":
        return isProjectComplete(project);
      case "overdue":
        return isOverdue(project.dueDate, isProjectComplete(project));
      default:
        return true;
    }
  });

  if (projects.length === 0) {
    return <p className="empty-hint">No projects yet. Add one above.</p>;
  }

  if (filteredProjects.length === 0) {
    return <p className="empty-hint">No projects match this filter.</p>;
  }

  return (
    <ul className="project-list">
      {filteredProjects.map((project) => (
        <ProjectItem key={project.id} project={project} clientId={clientId} />
      ))}
    </ul>
  );
}
