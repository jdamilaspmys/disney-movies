import MovieList from "./MovieList";
import { useEffect, useState } from "react";
import Constants from "../constant/Constants";
import axios from "axios";

const Dashboard = () => {
  const [movies, setMovies] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Title");
  const [orderBy, setOrderBy] = useState("asc");

  const yearArray = [
    2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020,
  ];
  const pageLimitArray = [5, 10, 25, 50, 100];

  useEffect(() => {
    getMovies({});
  }, []);

  const getMovies = ({
    filterValue = "",
    limitValue = "",
    pageValue = "",
    orderByValue = "",
    sortByValue = "",
  }) => {
    const finalQuery = `page=${pageValue || page}&limit=${
      limitValue || limit
    }&sortBy=${sortByValue || sortBy}&orderBy=${
      orderByValue || orderBy
    }&search=${search}&year=${
      (filterValue || filter) !== "All" ? filterValue || filter : ""
    }`;

    axios
      .get(`${Constants.REACT_APP_SERVER_URL}/movies?${finalQuery}`)
      .then((res) => {
        setMovies(res.data.data);
        setTotal(res.data.meta.total);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const filterChangeHandler = (event) => {
    setFilter(event.target.value);
    getMovies({ filterValue: event.target.value });
  };

  const searchHandler = () => {
    getMovies({});
  };
  const searchChangeHandler = (event) => {
    setSearch(event.target.value);
  };

  const limitChangeHandler = (event) => {
    setLimit(event.target.value);
    getMovies({ limitValue: event.target.value });
  };

  const pageChangeHandler = (event) => {
    setPage(event.target.value);
    getMovies({ pageValue: event.target.value });
  };

  const sortbyOrderByHandler = (sortBy, orderBy) => {
    console.log(sortBy, orderBy);
    setSortBy(sortBy);
    setOrderBy(orderBy);
    getMovies({ orderByValue: orderBy, sortByValue: sortBy });
  };

  return (
    <>
      <div>
        <div>
          <input
            value={search}
            placeholder="Search "
            onChange={searchChangeHandler}
          />
          <button onClick={searchHandler}>Search</button>
        </div>
        <select value={filter} onChange={filterChangeHandler}>
          <option value="All">All</option>
          {yearArray.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
      <MovieList
        movies={movies}
        onSortByOrderBy={sortbyOrderByHandler}
      ></MovieList>
      <div>
        page :{" "}
        <select value={page} onChange={pageChangeHandler}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
      <div>
        size :{" "}
        <select value={limit} onChange={limitChangeHandler}>
          {pageLimitArray.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
      <div>total : {total}</div>
    </>
  );
};

export default Dashboard;
