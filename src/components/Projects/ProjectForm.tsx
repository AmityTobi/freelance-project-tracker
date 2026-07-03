import { useForm } from "../../hooks/useForm";

import { validateTitle } from "../../util/validation";
import { ProjectData } from "../../types/client";

import Input from "../UI/Input";
import Button from "../UI/Button";
import { useAppContext } from "../../store/AppContext";

export default function ProjectForm() {
  const { onAddProject, onCloseProjectForm } = useAppContext();

  const { errors, handleBlur, handleChange, validate } = useForm({
    title: validateTitle,
  });

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const projectData = Object.fromEntries(fd.entries()) as ProjectData;

    if (!validate(projectData)) return;

    onAddProject(projectData);
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

      <Button type="submit">Submit</Button>
      <Button type="button" onClick={onCloseProjectForm}>
        Cancel
      </Button>
    </form>
  );
}
