export function validateEmail(value: string): string | null {
  const emailRegex = /\S+@\S+\.\S+/;

  if (!emailRegex.test(value)) return "Please enter a valid email";
  return null;
}

function isEmpty(value: string): boolean {
  return value.trim() === "";
}

export function validateFullName(value: string): string | null {
  if (isEmpty(value)) return "Name cannot be empty";
  return null;
}

export function validateTitle(value: string): string | null {
  if (isEmpty(value)) return "Title cannot be empty";
  return null;
}

export function validateDesc(value: string): string | null {
  if (isEmpty(value)) return "Description cannot be empty";
  return null;
}
