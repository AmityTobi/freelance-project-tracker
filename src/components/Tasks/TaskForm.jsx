import { validateDesc } from "../../util/validation";
import Input from "../UI/Input.jsx";
import Button from "../UI/Button.jsx";
import { useForm } from "../../hooks/useForm.js";

export default function TaskForm({ onAddTask, onClose }) {
  const { validate, handleBlur, handleChange, errors } = useForm({
    desc: validateDesc,
  });

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const taskData = Object.fromEntries(fd.entries());

    if (!validate(taskData)) return;

    onAddTask(taskData);
    onClose();

    event.target.reset();
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Description"
        type="text"
        id="desc"
        error={errors.desc}
        onChange={() => handleChange("desc")}
        onBlur={(e) => handleBlur("desc", e.target.value)}
      />

      <Button type="submit">Submit</Button>
      <Button type="button" onClick={onClose}>
        Cancel
      </Button>
    </form>
  );
}
