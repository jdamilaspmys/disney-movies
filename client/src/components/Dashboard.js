import MovieList from "./MovieList";
import { useEffect, useState } from "react";
import Constants from "../constant/Constants";
import axios from "axios";
<<<<<<< HEAD
import Logout from "./Logout";
=======
>>>>>>> 903368136664e8d10eff8fa7009861fbb61c680d
import { Container, Row, Col, Button } from "react-bootstrap";

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
      .get(`${Constants.REACT_APP_SERVER_URL}/movies?${finalQuery}`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
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
    setSortBy(sortBy);
    setOrderBy(orderBy);
    getMovies({ orderByValue: orderBy, sortByValue: sortBy });
  };

  return (
    <Container>
      <Row>
        <Logout></Logout>
      </Row>
      <Row>
        <Col className="text-center">
          <h2>Disney Movies</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <input
            value={search}
            placeholder="Search "
            onChange={searchChangeHandler}
          />
          <Button variant="info" onClick={searchHandler}>
            Search
          </Button>
        </Col>
        <Col>
          <span> Select Year </span>
          <select value={filter} onChange={filterChangeHandler}>
            <option value="All">All</option>
            {yearArray.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </Col>
      </Row>
      <MovieList
        movies={movies}
        onSortByOrderBy={sortbyOrderByHandler}
        sortBy={sortBy}
        orderBy={orderBy}
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
    </Container>
  );
};

export default Dashboard;
