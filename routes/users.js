/**
 * Users routes
 * @module userroutes
 * */

const express = require('express');
const Models = require('../models/users');
const passport = require('passport');
const {check, validationResult} = require('express-validator');

// eslint-disable-next-line
const router = express.Router();
const Users = Models.User;

/**
 * Function to find a user by username
 * @method userByname
 * @param string username.
 * @return object with the user data.
 */

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

/**
 * Function to get all the users
 * @method getAllusers
 * @return an array of users
 */
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

/**
 * Function to create an user
 * @method createuser
 * @param object with username, email, brithday, password
 * @return the new user created
 */
router.post('/',
    check('Username', 'Username is required').isLength({min: 5}),
    check('Username', 'Username contains non alphanumeric characters.')
        .isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail(),
    (req, res) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
      }
      const hashedPassword = Users.hashPassword(req.body.Password);
      Users.findOne({Username: req.body.Username}).then((user) => {
        if (user) {
          return res.status(409).json({
            message: req.body.Username + ' already exists'});
        } else {
          Users.create({
            Username: req.body.Username,
            Password: hashedPassword,
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
    },
);

/**
 * Function that edit an existing user
 * @method edituser
 * @param object username, email, birthday, password
 * @return the edited user
 */
router.put('/:Username', passport.authenticate('jwt', {session: false}),
    check('Username', 'Username is required').isLength({min: 5}),
    check('Username', 'Username contains non alphanumeric characters.')
        .isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail(),
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
      };
      const hashedPassword = Users.hashPassword(req.body.Password);
      Users.findOne({Username: req.body.Username}).then((user) => {
        if (user && user.Username !== req.params.Username) {
          return res.status(409).json({
            message: req.body.Username + ' already exists'});
        } else {
          Users.findOneAndUpdate({Username: req.params.Username}, {
            $set:
              {
                Username: req.body.Username,
                Password: hashedPassword,
                Email: req.body.Email,
                Birthday: req.body.Birthday,
              },
          },
          {new: true})
              .then((updatedUser) => {
                if (!updatedUser) {
                  return res.status(409).json({
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
        }
      });
    },
);

/**
 * Function that deletes a ser
 * @method deleteuser
 * @param string username
 * @return successful message
 */
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

/**
 * Function that add a movie to the user favorites
 * @method addToFavorites
 * @param string userid and movieid
 * @return user edited information
 */
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

/**
 * Function that deletes a movie form the user favorites
 * @method deleteFromFavorites
 * @param string userid and movieid
 * @return user edited information
 */
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
