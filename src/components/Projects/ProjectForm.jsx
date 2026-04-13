export default function ProjectForm({ onAddProject, onClose }) {
  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const projectData = Object.fromEntries(fd.entries());
    onAddProject(projectData);
    onClose();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input type="text" name="title" id="title" />

      <button type="submit">Submit</button>
      <button onClick={onClose}>Cancel</button>
    </form>
  );
}
