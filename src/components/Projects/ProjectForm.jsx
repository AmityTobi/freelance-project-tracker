import { useState } from "react";

import { validateTitle } from "../../util/validation.js";

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
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        id="title"
        className={error ? "input-error" : ""}
        onChange={() => setError(null)}
        onBlur={(e) => {
          const error = validateTitle(e.target.value);
          setError(error);
        }}
      />
      {error && <p className="error-text">{error}</p>}

      <button type="submit">Submit</button>
      <button type="button" onClick={onClose}>
        Cancel
      </button>
    </form>
  );
}
