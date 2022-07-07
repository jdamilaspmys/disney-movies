var express = require("express");
var router = express.Router();

const { SAMPLE_MOVIES } = require("../constant/dummy");

/* GET movies listing. */
router.get("/", function (req, res, next) {
  res.status(200).json(SAMPLE_MOVIES);
});

/* GET movie by Id */

router.get("/:id", function (req, res, next) {
  const id = req.params.id;
  console.log(id);
  const movie = SAMPLE_MOVIES.find((movie) => movie.id === id);
  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(404).json("Resource Not Found");
  }
});

module.exports = router;
