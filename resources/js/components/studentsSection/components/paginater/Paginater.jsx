import "./paginater.css";
import { useSelector, useDispatch } from "react-redux";
import { setLink } from "../../studentSlice";
import { concatLink } from "../../../../helpers/helpers";

export default function Paginater() {
  const dispatch = useDispatch();
  const checkboxStates = useSelector(
    (state) => state.studyGroupSlice.checkboxStates
  );
  const {
    total_page,
    prev_page,
    next_page,
    first_page,
    last_page,
    searchByNameState,
    page_links,
  } = useSelector((state) => state.studentsSlice);

  const dataLinkAddition =
    "&" + concatLink("", checkboxStates, searchByNameState);

  const renderPaginateBtn = (btn) => {
    switch (btn) {
      case "prev":
        if (page_links.findIndex((link) => link.active) !== 0) {
          return (
            <div
              data-link={prev_page + dataLinkAddition}
              onClick={handlePageChange}
            >
              <a href={prev_page}>
                <i className="fa-solid fa-angle-left"></i>
              </a>
            </div>
          );
        }
        break;

      case "next":
        if (
          page_links.findIndex((link) => link.active) !==
          page_links.length - 1
        ) {
          return (
            <div
              data-link={next_page + dataLinkAddition}
              onClick={handlePageChange}
            >
              <a href={next_page}>
                <i className="fa-solid fa-angle-right"></i>
              </a>
            </div>
          );
        }
        break;

      case "first":
        if (!page_links.find((link) => link.url === first_page)) {
          return (
            <div
              data-link={first_page + dataLinkAddition}
              onClick={handlePageChange}
            >
              <a href={first_page}>
                <i className="fa-solid fa-angles-left"></i>
              </a>
            </div>
          );
        }
        break;

      case "last":
        if (!page_links.find((link) => link.url === last_page)) {
          return (
            <div
              data-link={last_page + dataLinkAddition}
              onClick={handlePageChange}
            >
              <a href={last_page}>
                <i className="fa-solid fa-angles-right"></i>
              </a>
            </div>
          );
        }

      default:
        break;
    }
  };

  const handlePageChange = (e) => {
    dispatch(setLink(e.target.dataset.link));
  };

  return (
    <div className="page-container">
      <p className="total-page">
        TOTAL PAGE NUMBER:{" "}
        <span className="total-page-number">{total_page}</span>
      </p>
      <div className="paginater-container">
        {renderPaginateBtn("first")}
        {renderPaginateBtn("prev")}
        {page_links.length !== 0 &&
          page_links.map((link) => {
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
                    {link.label}
                  </a>
                </div>
              );
            }
          })}
        {renderPaginateBtn("next")}
        {renderPaginateBtn("last")}
      </div>
    </div>
  );
}
