import "./paginater.css";
import { useSelector, useDispatch } from "react-redux";
import { setLink } from "../../studentSlice";
import { concatLink } from "../../../../helpers/helpers";

export default function Paginater() {
  const dispatch = useDispatch();
  const checkboxStates = useSelector(
    (state) => state.studyGroupSlice.checkboxStates
  );
  const { total_page, first_page, last_page, searchByNameState, page_links } =
    useSelector((state) => state.studentsSlice);
  const dataLinkAddition =
    "&" + concatLink("", checkboxStates, searchByNameState);

  const handlePageChange = (e) => {
    dispatch(setLink(e.target.dataset.link));
  };

  const handleLinkLabel = (label) => {
    switch (label) {
      case "&laquo; Previous":
        return <i className="fa-solid fa-angle-left"></i>;

      case "Next &raquo;":
        return <i className="fa-solid fa-angle-right"></i>;

      case "first":
        return <i className="fa-solid fa-angles-left"></i>;

      case "last":
        return <i className="fa-solid fa-angles-right"></i>;

      default:
        return label;
    }
  };

  return (
    <div className="page-container">
      <p className="total-page">
        TOTAL PAGE NUMBER:{" "}
        <span className="total-page-number">{total_page}</span>
      </p>
      <div className="paginater-container">
        {page_links.findIndex((link) => link.active === true) !== 1 && (
          <div
            data-link={first_page + dataLinkAddition}
            onClick={handlePageChange}
          >
            <a href={first_page}>
              <i class="fa-solid fa-angles-left"></i>
            </a>
          </div>
        )}
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
                    {handleLinkLabel(link.label)}
                  </a>
                </div>
              );
            }
          })}
        {page_links.findIndex((link) => link.active === true) !==
          page_links.length - 2 && (
          <div
            data-link={last_page + dataLinkAddition}
            onClick={handlePageChange}
          >
            <a href={last_page}>
              <i class="fa-solid fa-angles-right"></i>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
