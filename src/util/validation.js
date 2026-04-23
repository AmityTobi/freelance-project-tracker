export function validateEmail(value) {
  const emailRegex = /\S+@\S+\.\S+/;

  if (!emailRegex.test(value)) return "Please enter a valid email";
  return null;
}

function isEmpty(value) {
  return value.trim() === "";
}

export function validateFullName(value) {
  if (isEmpty(value)) return "Name cannot be empty";
  return null;
}

export function validateTitle(value) {
  if (isEmpty(value)) return "Title cannot be empty";
  return null;
}

export function validateDesc(value) {
  if (isEmpty(value)) return "Description cannot be empty";
  return null;
}
