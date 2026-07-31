import { useAppContext } from "../../store/AppContext";
import { ProjectFilter } from "../../types/client";

const FILTERS: { value: ProjectFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
  { value: "overdue", label: "Overdue" },
];

export default function ProjectFilterBar() {
  const { projectFilter, onSetProjectFilter } = useAppContext();

  return (
    <div className="project-filter-bar">
      {FILTERS.map((filter) => (
        <button
          key={filter.value}
          type="button"
          className={`filter-chip ${projectFilter === filter.value ? "active" : ""}`}
          onClick={() => onSetProjectFilter(filter.value)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
