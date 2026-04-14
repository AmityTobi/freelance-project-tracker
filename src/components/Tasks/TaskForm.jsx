export default function TaskForm({ onAddTask, onClose }) {
  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const taskData = Object.fromEntries(fd.entries());
    onAddTask(taskData);
    onClose();

    event.target.reset();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="desc">Description</label>
      <input type="text" id="desc" name="desc" required />

      <button type="submit">Submit</button>
      <button type="button" onClick={onClose}>
        Cancel
      </button>
    </form>
  );
}
