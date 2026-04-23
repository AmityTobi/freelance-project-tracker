import { useState } from "react";
import { validateEmail, validateFullName } from "../../util/validation.js";

export default function ClientForm({ onAddClient, onClose }) {
  const [error, setError] = useState({});

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    const emailError = validateEmail(data.email);
    const fullNameError = validateFullName(data.fullName);

    if (emailError || fullNameError) {
      setError({
        email: emailError,
        fullName: fullNameError,
      });

      return;
    }

    setError({});
    onAddClient(data);
    onClose();
    event.target.reset();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="fullName">Name</label>
      <input
        type="text"
        id="fullName"
        name="fullName"
        className={error.fullName ? "input-error" : ""}
        onChange={() =>
          setError((prevState) => ({ ...prevState, fullName: null }))
        }
        onBlur={(e) => {
          const error = validateFullName(e.target.value);
          setError((prevState) => ({ ...prevState, fullName: error }));
        }}
      />
      {error.fullName && <p className="error-text">{error.fullName}</p>}

      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        className={error.email ? "input-error" : ""}
        onChange={() =>
          setError((prevState) => ({ ...prevState, email: null }))
        }
        onBlur={(e) => {
          const error = validateEmail(e.target.value);
          setError((prevState) => ({ ...prevState, email: error }));
        }}
      />
      {error.email && <p className="error-text">{error.email}</p>}

      <button type="submit">Submit</button>
      <button type="button" onClick={onClose}>
        Cancel
      </button>
    </form>
  );
}
