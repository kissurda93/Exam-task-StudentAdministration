import axios from "axios";
import { useState } from "react";
import { setMessage } from "../../../messages/message/messageSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../../../studentsSection/fetchStudents";

export default function DeleteStudent({ name, id, setModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { target_link } = useSelector((state) => state.studentsSlice);

  const handleDelete = async () => {
    if (confirm(`Do you want to delete ${name}?`)) {
      setLoading(true);
      try {
        const response = await axios.delete(`/deleteStudent/${id}`);
        if (response.status === 200) {
          dispatch(setMessage(response.data.message));
          dispatch(fetchStudents(target_link));
          setModal(false);
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <button className="delete" disabled={loading} onClick={handleDelete}>
      DELETE STUDENT
    </button>
  );
}
