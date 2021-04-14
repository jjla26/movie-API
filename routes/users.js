const express = require('express');
const Models = require('../models/users');
const passport = require('passport');

// eslint-disable-next-line
const router = express.Router();
const Users = Models.User;

// Get a user by Username
router.get('/:Username', passport.authenticate('jwt', {session: false}),
    (req, res) => {
      Users.findOne({Username: req.params.Username})
          .then((user) => {
            if (!user) {
              return res.status(404).json({
                message: `${req.params.Username} was not found`,
              });
            } else {
              return res.status(200).json({
                data: user,
                message: 'User has been retrieved',
              });
            }
          })
          .catch((error) => res.status(400).json(error));
    },
);

// Route to get all the users
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
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
      return res.status(409).send(req.body.Username + ' already exists');
    } else {
      Users.create({
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday,
      })
          .then((user) => res.status(201).json({
            data: user,
            message: 'User has been created',
          }))
          .catch((error) => {
            res.status(400).json(error);
          });
    }
  });
});

// Route to edit an user
router.put('/:Username', passport.authenticate('jwt', {session: false}),
    (req, res) => {
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
          .then((updatedUser) => {
            if (!updatedUser) {
              return res.status(400).json({
                message: 'Update was not successful',
              });
            } else {
              return res.status(200).json({
                data: updatedUser,
                message: 'User has been updated',
              });
            }
          })
          .catch((error) => res.status(400).json(error));
    },
);

// Route remove an user
router.delete('/:Username', passport.authenticate('jwt', {session: false}),
    (req, res) => {
      Users.findOneAndRemove({Username: req.params.Username})
          .then((user) => {
            if (!user) {
              return res.status(404)
                  .json({message: `${req.params.Username} was not found`});
            } else {
              return res.status(200)
                  .json({message: `${req.params.Username} was deleted`});
            }
          })
          .catch((error) => res.status(400).json(error));
    },
);

// Route to add a movie to favorites
router.post('/:Username/favorites/:MovieID',
    passport.authenticate('jwt', {session: false}), (req, res) => {
      Users.findOneAndUpdate({Username: req.params.Username}, {
        $addToSet: {FavoriteMovies: req.params.MovieID}},
      {new: true})
          .then((updatedUser) => {
            if (!updatedUser) {
              return res.status(409).json({
                message: 'Update was not successful',
              });
            } else {
              return res.status(200).json({
                data: updatedUser,
                message: 'Movie has been added to favorites',
              });
            }
          })
          .catch((error) => res.status(400).json(error));
    },
);

// Route to remove a movie from favorites
router.delete('/:Username/favorites/:MovieID',
    passport.authenticate('jwt', {session: false}), (req, res) => {
      Users.findOneAndUpdate({Username: req.params.Username}, {
        $pull: {FavoriteMovies: req.params.MovieID}},
      {new: true})
          .then((updatedUser) => {
            if (!updatedUser) {
              return res.status(409).json({
                message: 'Update was not successful',
              });
            } else {
              return res.status(200).json({
                data: updatedUser,
                message: 'Movie has been removed to favorites',
              });
            }
          })
          .catch((error) => res.status(400).json(error));
    },
);

module.exports = router;
