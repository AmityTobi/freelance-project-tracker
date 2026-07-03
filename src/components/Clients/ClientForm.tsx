import { validateEmail, validateFullName } from "../../util/validation";
import { Client, ClientData } from "../../types/client";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { useForm } from "../../hooks/useForm";
import { useAppContext } from "../../store/AppContext";

interface ClientFormProps {
  handleCloseForm: () => void;
  addOptimisticClients: (action: Client) => void;
}

export default function ClientForm({
  handleCloseForm,
  addOptimisticClients,
}: ClientFormProps) {
  const { onAddClient, isLoading } = useAppContext();

  const { errors, handleBlur, handleChange, validate } = useForm({
    fullName: validateFullName,
    email: validateEmail,
  });

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries()) as ClientData;

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
        onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
          handleBlur("fullName", e.target.value)
        }
      />

      <Input
        label="Email"
        id="email"
        type="email"
        error={errors.email}
        onChange={() => handleChange("email")}
        onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
          handleBlur("email", e.target.value)
        }
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
