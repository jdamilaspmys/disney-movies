var express = require("express");
var router = express.Router();

const { SAMPLE_MOVIES } = require("../constant/dummy");
const {
  DEFAULT_PAGINATION,
  DEFAULT_SORT_BY_ORDER_BY,
} = require("../constant/defaultValues");

/* GET movies listing. */
router.get("/", function (req, res, next) {
  const {
    page = DEFAULT_PAGINATION.PAGE,
    limit = DEFAULT_PAGINATION.LIMIT,
    sortBy = DEFAULT_SORT_BY_ORDER_BY.MOVIES.SORY_BY,
    orderBy = DEFAULT_SORT_BY_ORDER_BY.MOVIES.ORDER_BY,
  } = req.query || {};
  res
    .status(200)
    .json({ data: SAMPLE_MOVIES, meta: { page, limit, sortBy, orderBy } });
});

/* GET movie by Id */

router.get("/:id", function (req, res, next) {
  const id = req.params.id;
  const movie = SAMPLE_MOVIES.find((movie) => movie.id === id);
  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(404).json("Resource Not Found");
  }
});

module.exports = router;
