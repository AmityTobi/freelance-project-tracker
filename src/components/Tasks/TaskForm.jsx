import { useState } from "react";

import { validateDesc } from "../../util/validation";

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
      <label htmlFor="desc">Description</label>
      <input
        type="text"
        id="desc"
        name="desc"
        className={error ? "input-error" : ""}
        onChange={() => setError(null)}
        onBlur={(e) => {
          const error = validateDesc(e.target.value);
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
