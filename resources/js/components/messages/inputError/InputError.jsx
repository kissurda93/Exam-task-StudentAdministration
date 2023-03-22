import "./inputError.css";

export default function InputError({ status, inputName }) {
  return (
    <>
      {status.errors[inputName] && (
        <p className="input-error">{status.errors[inputName]}</p>
      )}
    </>
  );
}
