import "./studentSearchForm.css";

export default function StudentSearchForm() {
  return (
    <form className="student-search-form">
      <label>
        SEARCH FOR NAME
        <span className="tricky-workaround-span" />
        <input type="text" className="search-input" />
      </label>
    </form>
  );
}
