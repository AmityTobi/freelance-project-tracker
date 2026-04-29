import { useState } from "react";

import { validateTitle } from "../../util/validation.js";
import Input from "../UI/Input.jsx";
import Button from "../UI/Button.jsx";

export default function ProjectForm({ onAddProject, onClose }) {
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const projectData = Object.fromEntries(fd.entries());

    const titleError = validateTitle(projectData.title);

    if (titleError) {
      setError(titleError);
      return;
    }

    setError(null);
    onAddProject(projectData);
    onClose();

    event.target.reset();
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Title"
        id="title"
        type="text"
        error={error}
        onChange={() => setError(null)}
        onBlur={(e) => {
          const error = validateTitle(e.target.value);
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
