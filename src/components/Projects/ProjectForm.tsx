import { useForm } from "../../hooks/useForm.js";
import { validateTitle } from "../../util/validation.js";

import Input from "../UI/Input.jsx";
import Button from "../UI/Button.js";
import { useAppContext } from "../../store/AppContext.js";

export default function ProjectForm() {
  const { onAddProject, onCloseProjectForm } = useAppContext();

  const { errors, handleBlur, handleChange, validate } = useForm({
    title: validateTitle,
  });

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const projectData = Object.fromEntries(fd.entries());

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
        onBlur={(e) => {
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
