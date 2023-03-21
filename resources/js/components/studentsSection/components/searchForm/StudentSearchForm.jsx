import "./studentSearchForm.css";
import { useDispatch, useSelector } from "react-redux";
import { setLink, setSearchByName } from "../../studentSlice";

let TIME_OUT = null;

export default function StudentSearchForm() {
  const dispatch = useDispatch();
  const searchState = useSelector(
    (state) => state.studentsSlice.searchByNameState
  );
  const checkboxStates = useSelector(
    (state) => state.studyGroupSlice.checkboxStates
  );

  const handleChange = (e) => {
    if (TIME_OUT) {
      clearTimeout(TIME_OUT);
    }

    dispatch(setSearchByName(e.target.value));

    const { biology, math, history, grammar, programming } = checkboxStates;
    const link =
      e.target.value !== ""
        ? `/students?biology=${biology}&math=${math}&history=${history}&grammar=${grammar}&programming=${programming}&name=${e.target.value}`
        : `/students?biology=${biology}&math=${math}&history=${history}&grammar=${grammar}&programming=${programming}`;

    TIME_OUT = setTimeout(() => dispatch(setLink(link)), 800);
  };

  return (
    <form className="student-search-form" onSubmit={(e) => e.preventDefault()}>
      <label>
        SEARCH FOR NAME
        <span className="tricky-workaround-span" />
        <input
          type="text"
          className="search-input"
          name="name"
          onChange={handleChange}
          value={searchState}
        />
      </label>
    </form>
  );
}
