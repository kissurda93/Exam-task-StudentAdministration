import "./filterForm.css";
import { useSelector, useDispatch } from "react-redux";
import { setCheckboxState } from "../../../studyGroupsSection/studyGroupSlice";
import { setLink } from "../../studentSlice";
import { concatLink } from "../../../../helpers/helpers";

export default function FilterForm() {
  const dispatch = useDispatch();
  const studyGroups = useSelector((state) => state.studyGroupSlice.studyGroups);
  const checkboxStates = useSelector(
    (state) => state.studyGroupSlice.checkboxStates
  );
  const nameValue = useSelector(
    (state) => state.studentsSlice.searchByNameState
  );

  const handleChange = (e) => {
    dispatch(setCheckboxState(e.target.name));

    const prevValue = checkboxStates[e.target.name];
    const newCheckboxStates = {
      ...checkboxStates,
      [e.target.name]: !prevValue,
    };

    dispatch(setLink(concatLink("students?", newCheckboxStates, nameValue)));
  };

  return (
    <form>
      <h4>FILTERS FOR STUDY GROUPS</h4>
      {studyGroups.map((group) => {
        return (
          <label key={group.id}>
            <input
              type="checkbox"
              onChange={handleChange}
              name={group.name}
              checked={checkboxStates[group.name]}
              value={true}
            />
            {group.name[0].toUpperCase() + group.name.substring(1)}
          </label>
        );
      })}
    </form>
  );
}
