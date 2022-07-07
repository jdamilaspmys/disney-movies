const MovieList = (props) => {
  return (
    <>
      <div>
        <table>
          <thead>
            <tr>
              <th>
                Title{" "}
                <span onClick={() => props.onSortByOrderBy("Title", "asc")}>
                  Up
                </span>
                <span onClick={() => props.onSortByOrderBy("Title", "desc")}>
                  Down
                </span>
              </th>
              <th>
                Synopsis
                <span onClick={() => props.onSortByOrderBy("Synopsis", "asc")}>
                  Up
                </span>
                <span onClick={() => props.onSortByOrderBy("Synopsis", "desc")}>
                  Down
                </span>
              </th>
              <th>
                Genre
                <span onClick={() => props.onSortByOrderBy("Genre", "asc")}>
                  Up
                </span>
                <span onClick={() => props.onSortByOrderBy("Genre", "desc")}>
                  Down
                </span>
              </th>
              <th>
                Year
                <span onClick={() => props.onSortByOrderBy("Year", "asc")}>
                  Up
                </span>
                <span onClick={() => props.onSortByOrderBy("Year", "desc")}>
                  Down
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {props.movies.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.Title}</td>
                <td>...</td>
                <td>{movie.Genre}</td>
                <td>{movie.Year}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div></div>
      </div>
    </>
  );
};

export default MovieList;
