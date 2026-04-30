import { useState } from "react";

export function useForm(validationConfig) {
  const [errors, setErrors] = useState(
    Object.keys(validationConfig).reduce((acc, key) => {
      acc[key] = null;
      return acc;
    }, {}),
  );

  function handleBlur(fieldName, value) {
    const error = validationConfig[fieldName](value);
    setErrors((prev) => ({ ...prev, [fieldName]: error }));
  }

  function handleChange(fieldName) {
    setErrors((prev) => ({ ...prev, [fieldName]: null }));
  }

  function validate(formData) {
    const newErrors = Object.keys(validationConfig).reduce((acc, key) => {
      const result = validationConfig[key](formData[key]);
      acc[key] = result;
      return acc;
    }, {});

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === null);
  }

  return { errors, handleBlur, handleChange, validate };
}
