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
router.get('/:Title', (req, res) => {
  Movies.findOne({Title: req.params.Title})
      .then((movie) => {
        if (!movie) {
          return res.status(400).json({
            message: `${req.params.Title} was not found`,
          });
        } else {
          return res.status(200).json({
            data: movie,
            message: 'Movie has been retrieved',
          });
        }
      })
      .catch((error) => res.status(400).json(error));
});

// Route to get genre of a movie
router.get('/:Name/genre', (req, res) => {
  Movies.findOne({'Genre.Name': req.params.Name})
      .then((movie) => {
        if (!movie) {
          return res.status(400).json({
            message: `${req.params.Name} was not found`,
          });
        } else {
          return res.status(200).json({
            data: movie.Genre,
            message: 'Genre has been retrieved',
          });
        }
      })
      .catch((error) => res.status(400).json(error));
});

// Route to get director of a movie
router.get('/:title/director', (req, res) => {
  return res.json({message: 'director'});
});

module.exports = router;
