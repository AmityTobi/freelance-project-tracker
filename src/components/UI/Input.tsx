export default function Input({ label, id, error, ...props }) {
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
