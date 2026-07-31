import { useForm } from "../../hooks/useForm";

import { validateTitle } from "../../util/validation";
import { ProjectData } from "../../types/client";

import Input from "../UI/Input";
import Button from "../UI/Button";
import { useAddProject } from "../../hooks/queries";
import { useAppContext } from "../../store/AppContext";

interface ProjectFormProps {
  clientId: string;
}

export default function ProjectForm({ clientId }: ProjectFormProps) {
  const { onCloseProjectForm } = useAppContext();
  const { mutate: addProject, isPending } = useAddProject(clientId);

  const { errors, handleBlur, handleChange, validate } = useForm({
    title: validateTitle,
  });

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const projectData = Object.fromEntries(fd.entries()) as ProjectData;

    if (!validate({ title: projectData.title })) return;

    addProject(projectData);
    onCloseProjectForm();

    event.target.reset();
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Title"
        id="title"
        type="text"
        error={errors.title}
        onChange={() => handleChange("title")}
        onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
          handleBlur("title", e.target.value);
        }}
      />

      <Input label="Due date (optional)" id="dueDate" type="date" error={null} />

      <Button type="submit" disabled={isPending}>
        {isPending ? "Adding..." : "Submit"}
      </Button>
      <Button type="button" onClick={onCloseProjectForm}>
        Cancel
      </Button>
    </form>
  );
}
