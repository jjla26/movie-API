const express = require('express');
// eslint-disable-next-line
const router = express.Router({mergeParams: true});
// const users = require('../data/users');
const Models = require('../models/users');

const Users = Models.User;

// Get a user by Username
router.get('/:Username', (req, res) => {
  Users.findOne({Username: req.params.Username})
      .then((user) => res.json(user))
      .catch((error) => res.status(400).json(error));
});

// Route to get all the users
router.get('/', (req, res) => {
  Users.find()
      .then( (users) => {
        return res.status(200).json({
          data: users,
          total: users.length,
          message: 'Users retrieved Succesfully',
        });
      })
      .catch((error) => res.status(400).json(error));
});

// Route to create an user
router.post('/', (req, res) => {
  Users.findOne({Username: req.body.Username}).then((user) => {
    if (user) {
      return res.status(400).send(req.body.Username + ' already exists');
    } else {
      Users.create({
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday,
      })
          .then((user) => res.status(201).json(user))
          .catch((error) => {
            res.status(400).json(error);
          });
    }
  });
});

// Route to edit an user
router.put('/:Username', (req, res) => {
  Users.findOneAndUpdate({Username: req.params.Username}, {
    $set:
      {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday,
      },
  },
  {new: true})
      .then((updatedUser) => res.status(200).json(updatedUser))
      .catch((error) => res.status(400).json(error));
});

// Route remove an user
router.delete('/:id', (req, res) => {
  return res.json({message: 'user removed'});
});

// Route to add a movie to favorites
router.post('/:Username/favorites/:MovieID', (req, res) => {
  Users.findOneAndUpdate({Username: req.params.Username}, {
    $push: {FavoriteMovies: req.params.MovieID}},
  {new: true})
      .then((updatedUser) => res.status(200).json(updatedUser))
      .catch((error) => res.status(400).json(error));
});

// Route to removie a movie from favorites
router.delete('/:id/favorites/:movieid', (req, res) => {
  return res.json({message: 'movie removed from favorites'});
});

module.exports = router;
