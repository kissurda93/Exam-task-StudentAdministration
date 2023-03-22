import "./studentsSection.css";
import { useSelector } from "react-redux";
import StudentSearchForm from "./components/searchForm/StudentSearchForm";
import FilterForm from "./components/filterForm/FilterForm";
import Spinner from "../spinners/Spinner";
import Paginater from "./components/paginater/Paginater";
import NewStudent from "./components/newStudent/NewStudent";

export default function StudentsSection() {
  const { students, status, filtered_students } = useSelector(
    (state) => state.studentsSlice
  );

  const collectStudyGroupsToStudentTable = (studyGroups) => {
    let studies = [];
    if (studyGroups.length < 3) {
      studyGroups.forEach((study) => {
        studies.push(study.name[0].toUpperCase() + study.name.substring(1));
      });

      return studies.join(", ");
    } else {
      for (let i = 0; i < 2; i++) {
        studies.push(
          studyGroups[i].name[0].toUpperCase() +
            studyGroups[i].name.substring(1)
        );
      }

      const restStudies = studyGroups.slice(2);

      const restStudiesNames = restStudies.map(
        (study) => study.name[0].toUpperCase() + study.name.substring(1)
      );

      return (
        <>
          {studies.join(", ") + " and "}
          <span className="rest-span">
            {`${restStudies.length} more`}
            <span className="tooltip">{restStudiesNames.join(", ")}</span>
          </span>
        </>
      );
    }
  };

  return (
    <section className="students-section">
      <div className="students-section-header">
        <div className="new-student-container">
          <StudentSearchForm />
          {filtered_students !== 0 ? (
            <p className="students-count">{filtered_students + " STUDENTS"}</p>
          ) : (
            <p className="students-count">{"0 STUDENTS"}</p>
          )}
          <NewStudent />
        </div>
        <Paginater />
      </div>
      <div className="students-section-body">
        <div className="students-section-filters">
          <FilterForm />
        </div>
        {status !== "succeeded" ? (
          <Spinner />
        ) : students.length !== 0 ? (
          <table className="students-table">
            <tbody>
              <tr>
                <th></th>
                <th>NAME</th>
                <th>SEX</th>
                <th>PLACE AND DATE OF BIRTH</th>
                <th className="align-right">GROUPS</th>
              </tr>
              {students.map((student) => {
                return (
                  <tr key={student.id}>
                    <td>
                      <img
                        className="student-photo"
                        src={student.photo}
                        alt="Student photo"
                        title={student.name}
                        height="40"
                        width="40"
                      />
                    </td>
                    <td>{student.name}</td>
                    <td>{student.sex}</td>
                    <td>{`${student.place_of_birth}, ${student.date_of_birth}`}</td>
                    <td className="align-right">
                      {student.studygroups.length === 0 ? (
                        <p className="no-group">Not in group</p>
                      ) : (
                        collectStudyGroupsToStudentTable(student.studygroups)
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p className="not-found">No student found!</p>
        )}
      </div>
    </section>
  );
}
