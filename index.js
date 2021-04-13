const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const movies = require('./routes/movies');
const users = require('./routes/users');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect('mongodb://localhost:27017/myFlixDB', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

const app = express();

app.use(bodyParser.json());
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

// Routes
app.use('/movies', movies);
app.use('/users', users);

const port = process.env.PORT || 8080;

// Server listener
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
