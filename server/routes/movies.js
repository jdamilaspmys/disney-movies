var express = require("express");
var router = express.Router();

const { SAMPLE_MOVIES } = require("../constant/dummy");
const {
  DEFAULT_PAGINATION,
  DEFAULT_SORT_BY_ORDER_BY,
} = require("../constant/defaultValues");
const Movie = require("../models/Movie");

/* GET movies listing. */
router.get("/", async (req, res, next) => {
  try {
    const {
      page = DEFAULT_PAGINATION.PAGE,
      limit = DEFAULT_PAGINATION.LIMIT,
      sortBy = DEFAULT_SORT_BY_ORDER_BY.MOVIES.SORY_BY,
      orderBy = DEFAULT_SORT_BY_ORDER_BY.MOVIES.ORDER_BY,
      // filter
      Year = "",
    } = req.query || {};
    const filterQuery = Year ? { Year } : {};
    const findQuery = { ...filterQuery };
    const sortQuery = [sortBy, orderBy === "desc" ? -1 : 1];
    const total = await Movie.count(findQuery);
    const movies = await Movie.find(findQuery)
      .sort([sortQuery])
      .skip(page - 1)
      .limit(limit)
      .exec();
    res
      .status(200)
      .json({ data: movies, meta: { total, page, limit, sortBy, orderBy } });
  } catch (err) {
    res.status(500).json("Internal Server Error");
  }
});

/* GET movie by Id */

router.get("/:id", function (req, res, next) {
  try {
    const id = req.params.id;
    const movie = SAMPLE_MOVIES.find((movie) => movie.id === id);
    if (movie) {
      res.status(200).json(movie);
    } else {
      res.status(404).json("Resource Not Found");
    }
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
});

// TODO : Only for Feed DATA
router.get("/reset/db", async (req, res, next) => {
  await Movie.remove({});
  SAMPLE_MOVIES.forEach(async (movie) => {
    const newMovie = new Movie({
      ...movie,
      Year: movie["Production Year"],
    });
    await newMovie.save();
  });
  res.status(200).json();
});

module.exports = router;
