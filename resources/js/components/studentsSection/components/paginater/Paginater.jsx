import "./paginater.css";
import { useSelector, useDispatch } from "react-redux";
import { setLink } from "../../studentSlice";

export default function Paginater() {
  const dispatch = useDispatch();
  const links = useSelector((state) => state.studentsSlice.page_links);

  const handlePageChange = (e) => {
    dispatch(setLink(e.target.dataset.link));
  };

  return (
    <div className="paginater-container">
      {links.length !== 0 &&
        links.map((link) => {
          return (
            <div
              key={link.label}
              data-link={link.url}
              onClick={handlePageChange}
            >
              <a
                href={link.url}
                className={link.active === true ? "active" : ""}
              >
                {link.label}
              </a>
            </div>
          );
        })}
    </div>
  );
}
