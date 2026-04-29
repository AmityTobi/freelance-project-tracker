import { useState } from "react";

import { validateDesc } from "../../util/validation";
import Input from "../UI/Input.jsx";
import Button from "../UI/Button.jsx";

export default function TaskForm({ onAddTask, onClose }) {
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const taskData = Object.fromEntries(fd.entries());

    const descError = validateDesc(taskData.desc);

    if (descError) {
      setError(descError);
      return;
    }

    setError(null);
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
        error={error}
        onChange={() => setError(null)}
        onBlur={(e) => {
          const error = validateDesc(e.target.value);
          setError(error);
        }}
      />

      <Button type="submit">Submit</Button>
      <Button type="button" onClick={onClose}>
        Cancel
      </Button>
    </form>
  );
}
