require("dotenv").config();
const mongoose = require("mongoose");
const mongoString = process.env.MONGODB_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;

const Movie = require("./models/Movie");
const { SAMPLE_MOVIES } = require("./constant/dummy");

const cleanDB = async (db) => {};

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", async () => {
  try {
    console.log("Database Connected");
    // remove all movies
    await Movie.deleteMany({});
    console.log("Movies Clean Completed !");
    // insert SAMPLE_MOVIES
    await Movie.insertMany(SAMPLE_MOVIES);
    console.log("Movies Seed Completed !");
    await database.close();
    console.log("Database Closed");
  } catch (err) {
    console.log(err);
    database.close();
    console.log("Database Closed");
  }
});
