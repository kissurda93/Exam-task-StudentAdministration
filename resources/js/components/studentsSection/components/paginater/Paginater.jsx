import "./paginater.css";
import { useSelector, useDispatch } from "react-redux";
import { setLink } from "../../studentSlice";

export default function Paginater() {
  const dispatch = useDispatch();
  const links = useSelector((state) => state.studentsSlice.page_links);
  const { biology, math, history, grammar, programming } = useSelector(
    (state) => state.studyGroupSlice.checkboxStates
  );
  const totalPageCount = useSelector((state) => state.studentsSlice.last_page);
  const nameValue = useSelector(
    (state) => state.studentsSlice.searchByNameState
  );
  const dataLinkAddition =
    nameValue === ""
      ? `&biology=${biology}&math=${math}&history=${history}&grammar=${grammar}&programming=${programming}`
      : `&biology=${biology}&math=${math}&history=${history}&grammar=${grammar}&programming=${programming}&name=${nameValue}`;

  const handlePageChange = (e) => {
    dispatch(setLink(e.target.dataset.link));
  };

  const handleLinkLabel = (label) => {
    switch (label) {
      case "&laquo; Previous":
        return <i className="fa-solid fa-angle-left"></i>;

      case "Next &raquo;":
        return <i className="fa-solid fa-angle-right"></i>;

      default:
        return label;
    }
  };

  return (
    <div className="page-container">
      <p className="total-page">
        TOTAL PAGE NUMBER:{" "}
        <span className="total-page-number">{totalPageCount}</span>
      </p>
      <div className="paginater-container">
        {links.length !== 0 &&
          links.map((link) => {
            if (link.url !== null) {
              return (
                <div
                  key={link.label}
                  data-link={link.url + dataLinkAddition}
                  onClick={handlePageChange}
                >
                  <a
                    href={link.url}
                    className={link.active === true ? "active" : ""}
                  >
                    {handleLinkLabel(link.label)}
                  </a>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
}
