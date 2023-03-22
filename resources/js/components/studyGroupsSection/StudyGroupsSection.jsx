import "./studyGroupsSection.css";
import { useSelector } from "react-redux";
import Spinner from "../spinners/Spinner";

export default function StudyGroupsSection() {
  const { status, studyGroups } = useSelector((state) => state.studyGroupSlice);

  return (
    <section className="study-groups-section">
      {status !== "succeeded" ? (
        <Spinner />
      ) : studyGroups.length !== 0 ? (
        <table className="study-group-table">
          <tbody>
            <tr>
              <th>GROUP NAME</th>
              <th>LEADER</th>
              <th>SUBJECT</th>
              <th>DATE AND TIME</th>
            </tr>
            {studyGroups.map((group) => {
              return (
                <tr key={group.id}>
                  <td>
                    {group.name[0].toUpperCase() + group.name.substring(1)}
                  </td>
                  <td>{group.leader}</td>
                  <td>
                    {group.subject[0].toUpperCase() +
                      group.subject.substring(1)}
                  </td>
                  <td>{group.date_and_time}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p className="not-found">No group found!</p>
      )}
    </section>
  );
}
