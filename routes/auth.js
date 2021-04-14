
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

// eslint-disable-next-line new-cap
const router = express.Router();
const jwtSecret = 'secret_jwt';

const generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username,
    expiresIn: '7d', // This specifies that the token will expire in 7 days
    algorithm: 'HS256', // This is the algorithm used to encode the JWT values
  });
};

router.post('/', (req, res) => {
  passport.authenticate('local', {session: false}, (error, user, info) => {
    if (error || !user) {
      return res.status(400).json({
        message: 'Something is not right',
        user: user,
      });
    }
    req.login(user, {session: false}, (error) => {
      if (error) {
        res.send(error);
      }
      const token = generateJWTToken(user.toJSON());
      return res.json({user, token});
    });
  })(req, res);
});

module.exports = router;
