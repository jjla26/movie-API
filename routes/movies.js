const express = require('express');
const Models = require('../models/movies');
const passport = require('passport');

// eslint-disable-next-line
const router = express.Router();
const Movies = Models.Movie;

// Route for movies pathname returns movies data
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
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
router.get('/:Title', passport.authenticate('jwt', {session: false}),
    (req, res) => {
      Movies.findOne({Title: req.params.Title})
          .then((movie) => {
            if (!movie) {
              return res.status(404).json({
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
    },
);

// Route genre by name
router.get('/:Name/genre', passport.authenticate('jwt', {session: false}),
    (req, res) => {
      Movies.findOne({'Genre.Name': req.params.Name})
          .then((movie) => {
            if (!movie) {
              return res.status(404).json({
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
    },
);

// Route director by name
router.get('/:Name/director', passport.authenticate('jwt', {session: false}),
    (req, res) => {
      Movies.findOne({'Director.Name': req.params.Name})
          .then((movie) => {
            if (!movie) {
              return res.status(404).json({
                message: `${req.params.Name} was not found`,
              });
            } else {
              return res.status(200).json({
                data: movie.Director,
                message: 'Director has been retrieved',
              });
            }
          })
          .catch((error) => res.status(400).json(error));
    },
);

module.exports = router;
