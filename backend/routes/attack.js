const router = require('express').Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const Attack = require('../models/attack');

function auth(req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    res.status(401).json('no token, authorization failed');
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json('token not valid');
  }
}

router.route('/add').post((req, res) => {
  let newUser = new Attack(req.body);
  newUser
    .save()
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.route('/').post(auth, (req, res) => {
  Attack.find()
    .then((attacks) => res.json(attacks))
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
