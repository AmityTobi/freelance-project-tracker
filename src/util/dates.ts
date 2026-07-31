export function formatDueDate(dueDate: string | null): string | null {
  if (!dueDate) return null;

  return new Date(dueDate).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function isOverdue(dueDate: string | null, isComplete: boolean): boolean {
  if (!dueDate || isComplete) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return new Date(dueDate) < today;
}

export function getProjectProgress(project: {
  tasks: { completed: boolean }[];
}): number {
  if (project.tasks.length === 0) return 0;

  const completed = project.tasks.filter((task) => task.completed).length;
  return Math.round((completed / project.tasks.length) * 100);
}

export function isProjectComplete(project: {
  tasks: { completed: boolean }[];
}): boolean {
  return project.tasks.length > 0 && project.tasks.every((task) => task.completed);
}
