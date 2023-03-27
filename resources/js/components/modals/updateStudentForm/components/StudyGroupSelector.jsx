import { upperCase } from "../../../../helpers/helpers";
import { useState, useEffect } from "react";

export default function StudyGroupSelector({
  studentGroups,
  allGroup,
  setGroupSet,
  setChanged,
}) {
  const [localGroupState, setLocaleGroupState] = useState(
    studentGroups.map((group) => group.name)
  );

  const removeGroup = (e) => {
    let dataSet = e.target.dataset.group;
    if (dataSet === undefined) {
      dataSet = e.target.parentElement.parentElement.dataset.group;
    }
    const filtered = localGroupState.filter((group) => group !== dataSet);
    setLocaleGroupState(filtered);
    setGroupSet(new Set(filtered));
    setChanged(true);
  };

  const addGroup = (e) => {
    if (!localGroupState.includes(e.target.value)) {
      setLocaleGroupState([...localGroupState, e.target.value]);
      setGroupSet(new Set([...localGroupState, e.target.value]));
      setChanged(true);
    }
  };

  return (
    <div className="student-study-group-conatiner">
      <h4>STUDY GROUPS</h4>
      {localGroupState.length !== 0 &&
        localGroupState.map((group) => {
          return (
            <div
              data-group={group}
              className="student-study-group"
              key={group}
              onClick={removeGroup}
            >
              {upperCase(group)}
              <span>
                <i className="fa-solid fa-square-minus"></i>
              </span>
            </div>
          );
        })}
      {localGroupState.length < 4 && (
        <>
          <select onChange={addGroup} defaultValue={null}>
            <option value={null} className="add-group-btn">
              {"ADD NEW GROUP"}
            </option>
            {allGroup.map((group) => {
              if (!localGroupState.includes(group.name)) {
                return (
                  <option key={group.id} value={group.name}>
                    {upperCase(group.name)}
                  </option>
                );
              }
            })}
          </select>
          <span className="plus-icon"></span>
        </>
      )}
    </div>
  );
}
