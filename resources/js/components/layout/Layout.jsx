import { useState, useEffect } from "react";
import "./layout.css";
import StudentsSection from "../studentsSection/StudentsSection";
import StudyGroupsSection from "../studyGroupsSection/StudyGroupsSection";
import { fetchStudents } from "../studentsSection/fetchStudents";
import { useDispatch, useSelector } from "react-redux";

const falseShowSections = {
  students: false,
  studyGroups: false,
};

export default function Layout() {
  const dispatch = useDispatch();
  const [showSection, setShowSection] = useState({
    students: true,
    studyGroups: false,
  });
  const fetchStudentsLink = useSelector(
    (state) => state.studentsSlice.target_link
  );
  const studentsCount = useSelector(
    (state) => state.studentsSlice.students_count
  );

  const handleSectionChange = (e) => {
    if (e.target.dataset.link) {
      setShowSection({ ...falseShowSections, [e.target.dataset.link]: true });
    } else {
      setShowSection({
        ...falseShowSections,
        [e.target.parentElement.dataset.link]: true,
      });
    }
  };

  useEffect(() => {
    dispatch(fetchStudents(fetchStudentsLink));
  }, [fetchStudentsLink]);

  return (
    <>
      <header>
        <div className="main-title">
          <h1>SAF</h1>
          <p>Student Administration Framework</p>
        </div>
        <div className="user-info">
          <img
            src="img/useravatar.png"
            alt="User avatar image"
            width={50}
            height={50}
          />
          <p>User</p>
        </div>
      </header>
      <main>
        <div className="switching-tabs">
          <div
            className={showSection.students ? "active-tab" : ""}
            data-link="students"
            onClick={handleSectionChange}
          >
            <h3>STUDENTS</h3>
            {studentsCount && <p>{studentsCount + " student registered"}</p>}
          </div>
          <div
            className={showSection.studyGroups ? "active-tab" : ""}
            data-link="studyGroups"
            onClick={handleSectionChange}
          >
            <h3>STUDY GROUPS</h3>
            <p>6 study groups with 0 students</p>
          </div>
        </div>
        <div className="section-container">
          {showSection.students && <StudentsSection />}
          {showSection.studyGroups && <StudyGroupsSection />}
        </div>
      </main>
    </>
  );
}
