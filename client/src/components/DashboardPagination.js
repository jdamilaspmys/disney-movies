import { Pagination } from "react-bootstrap";

const DashboardPagination = (props) => {
  const setPage = (currentPage) => {
    props.onPageChangeHandler(currentPage);
  };
  const limit = Number(props.limit);
  const total = Number(props.total);
  const calculateTotalPage = Math.ceil(total / limit);
  // Note : ( Enhancement ) n number of pages support more than 10 pages
  const totalPages = calculateTotalPage > 10 ? 10 : calculateTotalPage;
  const pagesArray = [...Array(totalPages ? totalPages : 1).keys()].map(
    (i) => i + 1
  );
  return (
    <>
      <Pagination>
        <Pagination.First
          disabled={props.page === 1}
          onClick={() => setPage(1)}
        />
        {pagesArray.map((item) => (
          <Pagination.Item
            key={item}
            active={props.page === item}
            onClick={() => setPage(item)}
          >
            {item}
          </Pagination.Item>
        ))}
        <Pagination.Last
          disabled={props.page === totalPages || totalPages < 1}
          onClick={() => setPage(totalPages)}
        />
      </Pagination>
      {calculateTotalPage > 10 &&
        `Note : At the moment support maximum 10 pages`}
    </>
  );
};

export default DashboardPagination;
