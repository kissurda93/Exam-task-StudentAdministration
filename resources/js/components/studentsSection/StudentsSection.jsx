import "./studentsSection.css";
import { useSelector } from "react-redux";
import StudentSearchForm from "./components/searchForm/StudentSearchForm";
import FilterForm from "./components/filterForm/FilterForm";
import Spinner from "../spinners/Spinner";
import Paginater from "./components/paginater/Paginater";
import NewStudent from "./components/newStudent/NewStudent";

export default function StudentsSection() {
  const { students, status, students_count } = useSelector(
    (state) => state.studentsSlice
  );

  const collectStudyGroupsToTable = (studyGroups) => {
    let studies = [];
    if (studyGroups.length < 3) {
      studyGroups.forEach((study) => {
        studies.push(study.name[0].toUpperCase() + study.name.substring(1));
      });
      return studies.join(", ");
    } else {
      const rest = studyGroups.length - 2;
      for (let i = 0; i < 2; i++) {
        studies.push(
          studyGroups[i].name[0].toUpperCase() +
            studyGroups[i].name.substring(1)
        );
      }
      return studies.join(", ") + ` and ${rest} more`;
    }
  };

  return (
    <section className="students-section">
      {status !== "succeeded" ? (
        <Spinner />
      ) : (
        <>
          <div className="students-section-header">
            <StudentSearchForm />
            <div className="new-student-container">
              <p className="students-count">{students_count + " STUDENTS"}</p>
              <NewStudent />
            </div>
            <Paginater />
          </div>
          <div className="students-section-body">
            <div className="students-section-filters">
              <FilterForm />
            </div>
            <table className="students-table">
              <tbody>
                <tr>
                  <th></th>
                  <th>NAME</th>
                  <th>SEX</th>
                  <th>PLACE AND DATE OF BIRTH</th>
                  <th className="align-right">GROUPS</th>
                </tr>
                {students.length !== 0 &&
                  students.map((student) => {
                    return (
                      <tr key={student.id}>
                        <td>
                          <img
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
                          {collectStudyGroupsToTable(student.studygroups)}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
}
