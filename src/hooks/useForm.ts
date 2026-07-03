import { useState } from "react";

type ValidationFn = (value: string) => string | null;

export function useForm<T extends Record<string, ValidationFn>>(
  validationConfig: T,
) {
  const [errors, setErrors] = useState<Record<keyof T, string | null>>(
    Object.keys(validationConfig).reduce(
      (acc, key) => {
        acc[key as keyof T] = null;
        return acc;
      },
      {} as Record<keyof T, string | null>,
    ),
  );

  function handleBlur(fieldName: keyof T, value: string) {
    const error = validationConfig[fieldName]!(value);
    setErrors((prev) => ({ ...prev, [fieldName]: error }));
  }

  function handleChange(fieldName: keyof T) {
    setErrors((prev) => ({ ...prev, [fieldName]: null }));
  }

  function validate(formData: Record<keyof T, string>) {
    const newErrors = Object.keys(validationConfig).reduce(
      (acc, key) => {
        const typedKey = key as keyof T;
        acc[typedKey] = validationConfig[typedKey]!(formData[typedKey]);

        return acc;
      },
      {} as Record<keyof T, string | null>,
    );

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === null);
  }

  return { errors, handleBlur, handleChange, validate };
}
