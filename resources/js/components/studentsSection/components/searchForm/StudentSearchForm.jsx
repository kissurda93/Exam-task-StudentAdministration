import "./studentSearchForm.css";
import { useDispatch, useSelector } from "react-redux";
import { setLink, setSearchByName } from "../../studentSlice";
import { concatLink } from "../../../../helpers/helpers";

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

    TIME_OUT = setTimeout(
      () =>
        dispatch(
          setLink(concatLink("/students?", checkboxStates, e.target.value))
        ),
      800
    );
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
