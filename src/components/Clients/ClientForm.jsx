export default function ClientForm({ onAddClient, onClose }) {
  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    onAddClient(data);
    onClose();

    event.target.reset();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="fullName">Name</label>
      <input type="text" id="fullName" name="fullName" required />

      <label htmlFor="email">Email</label>
      <input type="email" name="email" id="email" required />

      <button type="submit">Submit</button>
      <button onClick={onClose}>Cancel</button>
    </form>
  );
}
