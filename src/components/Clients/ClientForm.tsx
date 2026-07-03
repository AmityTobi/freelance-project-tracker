import { validateEmail, validateFullName } from "../../util/validation.js";
import Input from "../UI/Input.jsx";
import Button from "../UI/Button.js";
import { useForm } from "../../hooks/useForm.js";
import { useAppContext } from "../../store/AppContext.js";

export default function ClientForm({ handleCloseForm, addOptimisticClients }) {
  const { onAddClient, isLoading } = useAppContext();

  const { errors, handleBlur, handleChange, validate } = useForm({
    fullName: validateFullName,
    email: validateEmail,
  });

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    if (!validate(data)) return;

    onAddClient(data, handleCloseForm, addOptimisticClients);

    event.target.reset();
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Name"
        id="fullName"
        type="text"
        error={errors.fullName}
        onChange={() => handleChange("fullName")}
        onBlur={(e) => handleBlur("fullName", e.target.value)}
      />

      <Input
        label="Email"
        id="email"
        type="email"
        error={errors.email}
        onChange={() => handleChange("email")}
        onBlur={(e) => handleBlur("email", e.target.value)}
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
