import { useAppContext } from "../../store/AppContext";
import { useForm } from "../../hooks/useForm";
import { validateDesc } from "../../util/validation";
import { TaskData } from "../../types/client";

import Input from "../UI/Input";
import Button from "../UI/Button";

interface TaskFormProps {
  onClose: () => void;
}

export default function TaskForm({ onClose }: TaskFormProps) {
  const { onAddTask } = useAppContext();

  const { validate, handleBlur, handleChange, errors } = useForm({
    title: validateDesc,
  });

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const taskData = Object.fromEntries(fd.entries()) as TaskData;

    if (!validate(taskData)) return;

    onAddTask(taskData);
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

      <Button type="submit">Submit</Button>
      <Button type="button" onClick={onClose}>
        Cancel
      </Button>
    </form>
  );
}
