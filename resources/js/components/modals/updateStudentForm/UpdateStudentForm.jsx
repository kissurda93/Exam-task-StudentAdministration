import "./updateStudentForm.css";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import Spinner from "../../spinners/Spinner";
import axios from "axios";
import InputError from "../../messages/inputError/InputError";
import { fetchStudents } from "../../studentsSection/fetchStudents";
import { setMessage } from "../../messages/message/messageSlice";
import { listingSelectedGroups } from "../../../helpers/helpers";
import StudyGroupSelector from "./components/StudyGroupSelector";
import DeleteStudent from "./components/DeleteStudent";

export default function UpdateStudentForm({ id, setModal }) {
  const dispatch = useDispatch();
  const student = useSelector((state) =>
    state.studentsSlice.students.find((student) => student.id === id)
  );
  const studyGroups = useSelector((state) => state.studyGroupSlice.studyGroups);
  const targetLink = useSelector((state) => state.studentsSlice.target_link);
  const [submitData, setSubmitData] = useState({});
  const [photos, setPhotos] = useState(null);
  const [studyGroupSet, setStudyGroupSet] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [inputErrors, setInputErrors] = useState({ errors: {} });
  const [statesChanged, setStatesChanged] = useState(false);

  const handleChange = (e) => {
    const copyInputErrors = { ...inputErrors };
    delete copyInputErrors.errors[e.target.name];
    setInputErrors(copyInputErrors);
    setStatesChanged(true);

    switch (e.target.name) {
      case "photo":
        setPhotos(e.target.files);
        break;

      default:
        setSubmitData({ ...submitData, [e.target.name]: e.target.value });
        break;
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("id", id);

      for (let key in submitData) {
        formData.append(`${key}`, `${submitData[key]}`);
      }

      if (photos !== null) {
        const fileArray = [...photos];

        fileArray.forEach((file) => {
          formData.append("photo", file, `${file.name}`);
        });
      }

      if (studyGroupSet.size !== 0) {
        let groupsString = listingSelectedGroups(studyGroupSet);
        formData.append("study_groups", groupsString);
      }

      // Laravel have issues if im trying to send formData with PUT or PATCH!
      // The next line is a workaround for this problem.
      formData.append("_method", "PATCH");

      const response = await axios.post(`updateStudent/${id}`, formData);
      if (response.status === 200) {
        dispatch(setMessage(response.data.message));
        dispatch(fetchStudents(targetLink));
        setModal(false);
      }
    } catch (e) {
      if (e.response.data.errors) {
        setInputErrors(e.response.data);
      } else {
        console.warn(e);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overlay" onClick={() => setModal(false)}>
      <form
        className="update-student-form"
        onSubmit={(e) => e.preventDefault()}
        onClick={(e) => e.stopPropagation()}
      >
        <h3>
          details of <span className="name-in-title">{student.name}</span>
        </h3>
        <div>
          <img
            src={student.photo}
            alt="Student photo"
            height={300}
            width={300}
          />
          <div className="details">
            <p>SEX: {student.sex}</p>
            <p>PLACE OF BIRTH: {student.place_of_birth}</p>
            <p>DATE OF BIRTH: {student.date_of_birth}</p>
            <label>
              NAME
              <input
                name="name"
                type={"text"}
                defaultValue={student.name}
                onChange={handleChange}
              />
              <InputError status={inputErrors} inputName={"name"} />
            </label>
            <label>
              EMAIL
              <input
                name="email"
                type={"email"}
                defaultValue={student.email}
                onChange={handleChange}
              />
              <InputError status={inputErrors} inputName={"email"} />
            </label>
            <label>
              NEW PHOTO
              <span className="tricky-workaround-span-upload" />
              <input
                name="photo"
                type={"file"}
                onChange={handleChange}
                accept={"image/png,image/jpg,image/jpeg"}
              />
              <InputError status={inputErrors} inputName={"photo"} />
            </label>
          </div>
        </div>
        <div>
          <StudyGroupSelector
            studentGroups={student.studygroups}
            allGroup={studyGroups}
            setGroupSet={setStudyGroupSet}
            setChanged={setStatesChanged}
          />
          <div className="update-btn-conatiner">
            {statesChanged && (
              <button
                className="save"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? <Spinner small={true} /> : "SAVE"}
              </button>
            )}
            <DeleteStudent
              name={student.name}
              id={student.id}
              setModal={setModal}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
