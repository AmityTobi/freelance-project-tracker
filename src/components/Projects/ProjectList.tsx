import { useAppContext } from "../../store/AppContext.js";
import ProjectItem from "./ProjectItem.jsx";

export default function ProjectList() {
  const { selectedClient } = useAppContext();
  if (selectedClient.projects.length === 0) {
    return <p className="empty-hint">No projects yet. Add one above.</p>;
  }

  return (
    <ul className="project-list">
      {selectedClient.projects.map((project) => (
        <ProjectItem key={project.id} project={project} />
      ))}
    </ul>
  );
}
