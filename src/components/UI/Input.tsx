interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error: string | null;
}

export default function Input({ label, id, error, ...props }: InputProps) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        name={id}
        id={id}
        className={error ? "input-error" : ""}
        {...props}
      />
      {error && <p>{error}</p>}
    </>
  );
}
