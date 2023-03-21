import "./paginater.css";
import { useSelector, useDispatch } from "react-redux";
import { setLink } from "../../studentSlice";

export default function Paginater() {
  const dispatch = useDispatch();
  const links = useSelector((state) => state.studentsSlice.page_links);
  const { biology, math, history, grammar, programming } = useSelector(
    (state) => state.studyGroupSlice.checkboxStates
  );
  const nameValue = useSelector(
    (state) => state.studentsSlice.searchByNameState
  );
  const linkAddition =
    nameValue === ""
      ? `&biology=${biology}&math=${math}&history=${history}&grammar=${grammar}&programming=${programming}`
      : `&biology=${biology}&math=${math}&history=${history}&grammar=${grammar}&programming=${programming}&name=${nameValue}`;

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
              data-link={link.url + linkAddition}
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
