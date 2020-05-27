const router = require('express').Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const Attack = require('../models/attack');
const MAX_ATTACKS_PER_REQUEST = 5;

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

router.route('/').post(auth, (req, res) => {
  console.log(req.body);
  const search = req.body.sendData.textSearch;

  const findArgs = search ? { $text: { $search: search } } : {};

  Attack.find(findArgs)
    .sort()
    .skip(req.body.sendData.skip || 0)
    .limit(MAX_ATTACKS_PER_REQUEST)
    .then((attacks) => res.json(attacks))
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
