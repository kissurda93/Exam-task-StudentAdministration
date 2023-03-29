import "./spinner.css";

export default function Spinner({ small }) {
  return (
    <div className="spinner-container">
      <div className={small ? "lds-ring small-spinner-container" : "lds-ring"}>
        <div className={small ? "small-spinner" : ""}></div>
        <div className={small ? "small-spinner" : ""}></div>
        <div className={small ? "small-spinner" : ""}></div>
        <div className={small ? "small-spinner" : ""}></div>
      </div>
    </div>
  );
}
