import { Table, Container, Row } from "react-bootstrap";

const UpIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-caret-up"
      viewBox="0 0 16 16"
    >
      <path d="M3.204 11h9.592L8 5.519 3.204 11zm-.753-.659 4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659z" />
    </svg>
  );
};

const UpFillIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-caret-up-fill"
      viewBox="0 0 16 16"
    >
      <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
    </svg>
  );
};

const DownFillIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-caret-down-fill"
      viewBox="0 0 16 16"
    >
      <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
    </svg>
  );
};

const DownIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-caret-down"
      viewBox="0 0 16 16"
    >
      <path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z" />
    </svg>
  );
};

const tranc = (str, limit = 10) => {
  if (str && str.length > limit) {
    return str.slice(0, limit) + "...";
  }
  return str;
};

const MovieList = (props) => {
  return (
    <Table striped bordered>
      <thead>
        <tr>
          <th>
            Title
            <span onClick={() => props.onSortByOrderBy("Title", "asc")}>
              {props.sortBy === "Title" && props.orderBy === "asc" ? (
                <UpFillIcon />
              ) : (
                <UpIcon />
              )}
            </span>
            <span onClick={() => props.onSortByOrderBy("Title", "desc")}>
              {props.sortBy === "Title" && props.orderBy === "desc" ? (
                <DownFillIcon />
              ) : (
                <DownIcon />
              )}
            </span>
          </th>
          <th>
            Synopsis
            <span onClick={() => props.onSortByOrderBy("Synopsis", "asc")}>
              {props.sortBy === "Synopsis" && props.orderBy === "asc" ? (
                <UpFillIcon />
              ) : (
                <UpIcon />
              )}
            </span>
            <span onClick={() => props.onSortByOrderBy("Synopsis", "desc")}>
              {props.sortBy === "Synopsis" && props.orderBy === "desc" ? (
                <DownFillIcon />
              ) : (
                <DownIcon />
              )}
            </span>
          </th>
          <th>
            Genre
            <span onClick={() => props.onSortByOrderBy("Genre", "asc")}>
              {props.sortBy === "Genre" && props.orderBy === "asc" ? (
                <UpFillIcon />
              ) : (
                <UpIcon />
              )}
            </span>
            <span onClick={() => props.onSortByOrderBy("Genre", "desc")}>
              {props.sortBy === "Genre" && props.orderBy === "desc" ? (
                <DownFillIcon />
              ) : (
                <DownIcon />
              )}
            </span>
          </th>
          <th>
            Year
            <span onClick={() => props.onSortByOrderBy("Year", "asc")}>
              {props.sortBy === "Year" && props.orderBy === "asc" ? (
                <UpFillIcon />
              ) : (
                <UpIcon />
              )}
            </span>
            <span onClick={() => props.onSortByOrderBy("Year", "desc")}>
              {props.sortBy === "Year" && props.orderBy === "desc" ? (
                <DownFillIcon />
              ) : (
                <DownIcon />
              )}
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        {props.movies.map((movie) => (
          <tr key={movie._id}>
            <td>{movie.Title}</td>
            <td>{tranc(movie?.Synopsis, 15)}</td>
            <td>{movie.Genre}</td>
            <td>{movie.Year}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default MovieList;
