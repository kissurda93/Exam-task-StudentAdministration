import "./newStudentForm.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../../spinners/Spinner";
import axios from "axios";
import InputError from "../../messages/inputError/InputError";
import { fetchStudents } from "../../studentsSection/fetchStudents";
import { upperCase, listingSelectedGroups } from "../../../helpers/helpers";
import { setMessage } from "../../messages/message/messageSlice";

export default function NewStudentForm({ setModal }) {
  const dispatch = useDispatch();
  const [submitData, setSubmitData] = useState({});
  const [photos, setPhotos] = useState(null);
  const [studyGroupSet, setStudyGroupSet] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [inputErrors, setInputErrors] = useState({ errors: {} });
  const studyGroups = useSelector((state) => state.studyGroupSlice.studyGroups);
  const targetLink = useSelector((state) => state.studentsSlice.target_link);

  const handleChange = (e) => {
    const copyInputErrors = { ...inputErrors };
    delete copyInputErrors.errors[e.target.name];
    setInputErrors(copyInputErrors);

    switch (e.target.name) {
      case "photo":
        setPhotos(e.target.files);
        break;

      case "study_groups":
        if (studyGroupSet.size < 4) {
          const oldSet = studyGroupSet;
          oldSet.add(e.target.value);
          setStudyGroupSet(new Set(oldSet));
        }
        break;

      default:
        setSubmitData({ ...submitData, [e.target.name]: e.target.value });
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

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

      const response = await axios.post("/newStudent", formData);
      if (response.status === 200) {
        setModal(false);
        dispatch(setMessage(response.data.message));
        dispatch(fetchStudents(targetLink));
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
        className="new-student-form"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <h3>ENTER THE STUDENT'S DETAILS</h3>
        <label>
          NAME
          <input type={"text"} name={"name"} onChange={handleChange} />
          <InputError status={inputErrors} inputName={"name"} />
        </label>
        <label>
          SEX
          <select name={"sex"} onChange={handleChange} defaultValue={null}>
            <option value={null}>---</option>
            <option value={"male"}>male</option>
            <option value={"female"}>female</option>
          </select>
          <InputError status={inputErrors} inputName={"sex"} />
        </label>
        <label>
          PLACE OF BIRTH
          <input
            type={"text"}
            name={"place_of_birth"}
            onChange={handleChange}
          />
          <InputError status={inputErrors} inputName={"place_of_birth"} />
        </label>
        <label>
          DATE OF BIRTH
          <input type={"date"} name={"date_of_birth"} onChange={handleChange} />
          <InputError status={inputErrors} inputName={"date_of_birth"} />
        </label>
        <label>
          EMAIL
          <input type={"email"} name={"email"} onChange={handleChange} />
          <InputError status={inputErrors} inputName={"email"} />
        </label>
        <label>
          PHOTO
          <span className="tricky-workaround-span-upload" />
          <input
            type={"file"}
            name={"photo"}
            onChange={handleChange}
            accept={"image/png, image/jpeg, image/jpg"}
          />
          <InputError status={inputErrors} inputName={"photo"} />
        </label>
        <label>
          STUDY GROUPS (MAX 4)
          <select
            name={"study_groups"}
            defaultValue={null}
            onChange={handleChange}
            multiple
            disabled={studyGroupSet.size === 4 ? true : false}
          >
            {studyGroups.length !== 0 &&
              studyGroups.map((group) => {
                return (
                  <option
                    key={group.id}
                    value={group.name}
                    disabled={studyGroupSet.has(group.name)}
                  >
                    {upperCase(group.name)}
                  </option>
                );
              })}
          </select>
          <p className="selectod-groups">
            {studyGroupSet.size !== 0 &&
              listingSelectedGroups(studyGroupSet, true)}
          </p>
          <InputError status={inputErrors} inputName={"study_groups"} />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? <Spinner small={true} /> : "SUBMIT"}
        </button>
      </form>
    </div>
  );
}
