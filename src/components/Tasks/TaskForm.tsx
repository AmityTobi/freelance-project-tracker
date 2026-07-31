import { useForm } from "../../hooks/useForm";
import { validateDesc } from "../../util/validation";
import { TaskData } from "../../types/client";

import Input from "../UI/Input";
import Button from "../UI/Button";
import { useAddTask } from "../../hooks/queries";

interface TaskFormProps {
  clientId: string;
  projectId: string;
  onClose: () => void;
}

export default function TaskForm({ clientId, projectId, onClose }: TaskFormProps) {
  const { mutate: addTask, isPending } = useAddTask(clientId, projectId);

  const { validate, handleBlur, handleChange, errors } = useForm({
    title: validateDesc,
  });

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const taskData = Object.fromEntries(fd.entries()) as TaskData;

    if (!validate(taskData)) return;

    addTask(taskData);
    onClose();

    event.target.reset();
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="title"
        type="text"
        id="title"
        error={errors.title}
        onChange={() => handleChange("title")}
        onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
          handleBlur("title", e.target.value)
        }
      />

      <Button type="submit" disabled={isPending}>
        {isPending ? "Adding..." : "Submit"}
      </Button>
      <Button type="button" onClick={onClose}>
        Cancel
      </Button>
    </form>
  );
}
