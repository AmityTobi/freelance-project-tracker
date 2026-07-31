import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import TaskItem from "./TaskItem";
import { useReorderTasks } from "../../hooks/queries";
import { Task } from "../../types/client";

interface TaskListProps {
  projectId: string;
  clientId: string;
  tasks: Task[];
}

export default function TaskList({ tasks, projectId, clientId }: TaskListProps) {
  const { mutate: reorderTasks } = useReorderTasks(clientId, projectId);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = tasks.findIndex((task) => task.id === active.id);
    const newIndex = tasks.findIndex((task) => task.id === over.id);

    const reordered = arrayMove(tasks, oldIndex, newIndex);
    reorderTasks(reordered.map((task) => task.id));
  }

  if (tasks.length === 0) {
    return <p className="no-task">No tasks yet</p>;
  }

  return (
    <>
      <div className="section-label" style={{ marginBottom: "6px" }}>
        {tasks.length === 1 ? "Task" : "Tasks"}
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={tasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          <ul className="task-list">
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                projectId={projectId}
                clientId={clientId}
              />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </>
  );
}
