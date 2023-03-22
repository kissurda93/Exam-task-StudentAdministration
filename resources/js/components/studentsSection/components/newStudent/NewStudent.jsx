import "./newStudent.css";
import NewStudentForm from "../../../modals/newStudentForm/NewStudentForm";
import { useState } from "react";

export default function NewStudent() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="new-button" onClick={() => setShowModal(true)}>
        New
      </button>
      {showModal && <NewStudentForm setModal={setShowModal} />}
    </>
  );
}
