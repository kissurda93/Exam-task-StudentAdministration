import { useState, useEffect } from "react";
import "./layout.css";
import StudentsSection from "../studentsSection/StudentsSection";
import StudyGroupsSection from "../studyGroupsSection/StudyGroupsSection";
import { fetchStudyGroups } from "../studyGroupsSection/fetchStudyGroups";
import { fetchStudents } from "../studentsSection/fetchStudents";
import { useDispatch, useSelector } from "react-redux";
import { resetMessage } from "../messages/message/messageSlice";
import Message from "../messages/message/Message";

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
  const { students_count, target_link } = useSelector(
    (state) => state.studentsSlice
  );
  const studyGroupsCount = useSelector(
    (state) => state.studyGroupSlice.studyGroups_count
  );
  const message = useSelector((state) => state.messageSlice.message);

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
    const timeOut = setTimeout(() => {
      dispatch(resetMessage());
    }, 3000);

    return () => clearTimeout(timeOut);
  }, [message]);

  useEffect(() => {
    dispatch(fetchStudents(target_link));
  }, [target_link]);

  useEffect(() => {
    dispatch(fetchStudyGroups());
  }, []);

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
          <Message />
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
            {students_count !== 0 && (
              <p>{students_count + " student registered"}</p>
            )}
          </div>
          <div
            className={showSection.studyGroups ? "active-tab" : ""}
            data-link="studyGroups"
            onClick={handleSectionChange}
          >
            <h3>STUDY GROUPS</h3>
            {studyGroupsCount !== 0 && (
              <p>{studyGroupsCount + " study group"}</p>
            )}
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
