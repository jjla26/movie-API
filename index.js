const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const movies = require('./routes/movies');
const users = require('./routes/users');
const dotenv = require('dotenv');
const auth = require('./routes/auth');
const cors = require('cors');
require('./auth/passport');

dotenv.config();

mongoose.connect(process.env.CONNECTION_URI,
    {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

const allowedOrigins = ['http://localhost:3000'];

const app = express();
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      // eslint-disable-next-line max-len
      const message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
      return callback(new Error(message), false);
    }
    return callback(null, true);
  },
}));

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(morgan('common'));

// Error handler
app.use((err, req, res, next) => {
  res.status(500).send('Something broke!');
});

// Routes
app.use('/login', auth);
app.use('/movies', movies);
app.use('/users', users);

const port = process.env.PORT || 8080;

// Server listener
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
