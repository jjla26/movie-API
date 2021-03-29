const express = require('express');
// eslint-disable-next-line
const router = express.Router();
const users = require('../data/users');

// Route to get all the users
router.get('/', (req, res) => {
  return res.status(200)
      .json({data: users, total: users.length,
        message: 'Users retrieved Succesfully'});
});

// Route to create an user
router.post('/', (req, res) => {
  return res.json({message: 'user created'});
});

// Route to edit an user
router.put('/', (req, res) => {
  return res.json({message: 'user updated'});
});

// Route remove an user
router.delete('/:id', (req, res) => {
  return res.json({message: 'user removed'});
});

// Route to add a movie to favorites
router.post('/:id/favorites/:movieid', (req, res) => {
  return res.json({message: 'movie added to favorites'});
});

// Route to removie a movie from favorites
router.delete('/:id/favorites/:movieid', (req, res) => {
  return res.json({message: 'movie removed from favorites'});
});

module.exports = router;
