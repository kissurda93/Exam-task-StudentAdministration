import "./message.css";
import { useSelector } from "react-redux";

export default function Message() {
  const { message, type } = useSelector((state) => state.messageSlice);

  return (
    <>
      {message !== "" && (
        <div className="message-container">
          <p className={type === "error" ? "error-message" : ""}>{message}</p>
        </div>
      )}
    </>
  );
}
