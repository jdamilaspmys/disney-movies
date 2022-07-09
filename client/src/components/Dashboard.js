import MovieList from "./MovieList";
import { useEffect, useState } from "react";
import Constants from "../constant/Constants";
import axios from "axios";
import Logout from "./Logout";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Form,
  FloatingLabel,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import styles from "./Dashboard.module.css";
import DashboardPagination from "./DashboardPagination";

const SearchIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-search"
      viewBox="0 0 16 16"
    >
      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
    </svg>
  );
};

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

  const pageChangeHandler = (currentPage) => {
    setPage(currentPage);
    getMovies({ pageValue: currentPage });
  };

  const sortbyOrderByHandler = (sortBy, orderBy) => {
    setSortBy(sortBy);
    setOrderBy(orderBy);
    getMovies({ orderByValue: orderBy, sortByValue: sortBy });
  };

  return (
    <Container>
      <Row className={styles.top}></Row>
      <Row>
        <Col className="text-center">
          <h1>Disney Movies</h1>
          <Logout></Logout>
        </Col>
      </Row>
      <Row className={styles.action_row}>
        <Col sm={1} md={3} lg={3} xl={4}></Col>
        <Col>
          <Card>
            <Card.Body>
              <InputGroup>
                <FormControl
                  value={search}
                  placeholder="Search ..."
                  onChange={searchChangeHandler}
                  required
                />
                <Button variant="info" onClick={searchHandler}>
                  <SearchIcon />
                </Button>
              </InputGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={5} md={4} lg={2} xl={2}>
          <Card>
            <Card.Body>
              <FloatingLabel
                controlId="floatingSelectGrid"
                label="Selected Year"
              >
                <Form.Select value={filter} onChange={filterChangeHandler}>
                  <option value="All">All</option>
                  {yearArray.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </Form.Select>
              </FloatingLabel>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Card>
          <Card.Body>
            <MovieList
              movies={movies}
              onSortByOrderBy={sortbyOrderByHandler}
              sortBy={sortBy}
              orderBy={orderBy}
            ></MovieList>
          </Card.Body>
        </Card>
      </Row>
      <Row className={styles.footer}>
        <Col sm={6} md={3} lg={4} xl={2}>
          <Card>
            <Card.Body>
              <FloatingLabel controlId="floatingSelectGrid" label="Page Size">
                <Form.Select value={limit} onChange={limitChangeHandler}>
                  {pageLimitArray.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </Form.Select>
              </FloatingLabel>
            </Card.Body>
          </Card>
        </Col>
        <Col className="text-center">
          <Card>
            <Card.Body>
              <DashboardPagination
                onPageChangeHandler={pageChangeHandler}
                total={total}
                page={page}
                limit={limit}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
