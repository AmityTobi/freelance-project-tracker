import { useState } from "react";

import { validateEmail, validateFullName } from "../../util/validation.js";
import Input from "../UI/Input.jsx";
import Button from "../UI/Button.jsx";

export default function ClientForm({
  onAddClient,
  handleCloseForm,
  isLoading,
  addOptimisticClients,
}) {
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
    onAddClient(data, handleCloseForm, addOptimisticClients);

    event.target.reset();
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Name"
        id="fullName"
        type="text"
        error={error.fullName}
        onChange={() =>
          setError((prevState) => ({ ...prevState, fullName: null }))
        }
        onBlur={(e) => {
          const error = validateFullName(e.target.value);
          setError((prevState) => ({ ...prevState, fullName: error }));
        }}
      />

      <Input
        label="Email"
        id="email"
        type="email"
        error={error.email}
        onChange={() =>
          setError((prevState) => ({ ...prevState, email: null }))
        }
        onBlur={(e) => {
          const error = validateEmail(e.target.value);
          setError((prevState) => ({ ...prevState, email: error }));
        }}
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Adding..." : "Submit"}
      </Button>
      <Button type="button" onClick={handleCloseForm}>
        Cancel
      </Button>
    </form>
  );
}
