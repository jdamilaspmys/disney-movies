var express = require("express");
var router = express.Router();

const { SAMPLE_MOVIES } = require("../constant/dummy");
const {
  DEFAULT_PAGINATION,
  DEFAULT_SORT_BY_ORDER_BY,
} = require("../constant/defaultValues");
const Movie = require("../models/Movie");
const auth = require("../middleware/authService");

/* GET movies listing. */
router.get("/", auth, async (req, res, next) => {
  try {
    const {
      page = DEFAULT_PAGINATION.PAGE,
      limit = DEFAULT_PAGINATION.LIMIT,
      sortBy = DEFAULT_SORT_BY_ORDER_BY.MOVIES.SORY_BY,
      orderBy = DEFAULT_SORT_BY_ORDER_BY.MOVIES.ORDER_BY,
      // filter
      year = "",
      // search
      search = "",
    } = req.query || {};
    const filterQuery = year ? { Year: year } : {};
    const serachQuery = search ? { $text: { $search: search } } : {};
    const findQuery = { ...filterQuery, ...serachQuery };
    const sortQuery = [sortBy, orderBy === "desc" ? -1 : 1];
    const total = await Movie.count(findQuery);
    const movies = await Movie.find(findQuery)
      .sort([sortQuery])
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .exec();
    res.status(200).json({
      data: movies,
      meta: { total, page, limit, sortBy, orderBy, year, search },
    });
  } catch (err) {
    res.status(500).json("Internal Server Error");
  }
});

/* GET movie by Id */

router.get("/:id", auth, async (req, res, next) => {
  try {
    const id = req.params.id;
    const movie = await Movie.findById(id);
    if (movie) {
      res.status(200).json(movie);
    } else {
      res.status(404).json("Resource Not Found");
    }
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
});

module.exports = router;
