const express = require('express');
// eslint-disable-next-line
const router = express.Router();
// const movies = require('../data/movies');
const Models = require('../models/movies');

const Movies = Models.Movie;

// Route for movies pathname returns movies data
router.get('/', (req, res) => {
  Movies.find()
      .then((movies) => {
        return res.status(200).json({
          data: movies,
          total: movies.length,
          message: 'Movies retrieved Succesfully',
        });
      })
      .catch((error) => res.status(400).json(error));
});

// Route to get the movies by title
router.get('/:title', (req, res) => {
  return res.json(movies.find((movie) => movie.name === req.params.title));
});

// Route to get genre of a movie
router.get('/:title/genre', (req, res) => {
  return res.json({message: 'genre'});
});

// Route to get director of a movie
router.get('/:title/director', (req, res) => {
  return res.json({message: 'director'});
});

module.exports = router;
