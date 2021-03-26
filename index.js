const express = require('express');
const morgan = require('morgan');
const movies = require('./data/movies');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(express.static('public'));
app.use(morgan('common'));

// Error handler
app.use((err, req, res, next) => {
  res.status(500).send('Something broke!');
});

// Route for the root url
app.get('/', (req, res) => {
  return res.json('Welcome to the Movie API');
});

// Route for movies pathname returns movies data
app.get('/movies', (req, res) => {
  return res.json(movies);
});

// Route to get the movies by title
app.get('/movies/:title', (req, res) => {
  return res.json({message: "title"});
});

// Route to get genre of a movie
app.get('/movies/:title/genre', (req, res) => {
  return res.json({message: 'genre'});
});

// Route to get director of a movie
app.get('/movies/:title/director', (req, res) => {
  return res.json({message: 'director'});
});

// Route to create an user
app.post('/users', (req, res) => {
  return res.json({message: 'user created'});
});

// Route to edit an user
app.put('/users', (req, res) => {
  return res.json({message: 'user updated'});
});

// Route remove an user
app.delete('/users/:id', (req, res) => {
  return res.json({message: 'user removed'});
});

// Route to add a movie to favorites
app.post('/users/:id/favorites/:movieid', (req, res) => {
  return res.json({message: 'movie added to favorites'});
});

// Route to removie a movie from favorites
app.delete('/users/:id/favorites/:movieid', (req, res) => {
  return res.json({message: 'movie removed from favorites'});
});

const port = process.env.PORT || 8080;

// Server listener
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
