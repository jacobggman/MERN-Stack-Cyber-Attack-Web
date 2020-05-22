const router = require('express').Router();
const bcryptjs = require('bcryptjs');
let UserModel = require('../models/user');
const config = require('config');
const jwt = require('jsonwebtoken');

const HOUR = 3600;

function getHash(password) {
  hash = bcryptjs.hash(password, 10);
  return hash;
}

function returnError(res, err) {
  res.status(400).json('Error: ' + err);
}

router.route('/').get((req, res) => {
  UserModel.User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  let newUser = new UserModel.User(req.body);
  var userHash = '';

  if (!UserModel.validatePassword(newUser.password)) {
    returnError(res, UserModel.illegalPasswordMsg);
  }

  // hash password
  bcryptjs
    .hash(newUser.password, 10)
    .then((hash) => {
      newUser.password = hash;
      newUser
        .save()
        .then((user) => {
          jwt.sign(
            { user: user.id },
            config.get('jwtSecret'),
            {
              expiresIn: HOUR,
            },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: newUser.id,
                  hash: newUser.password,
                  email: newUser.email,
                },
              });
            }
          );
        })
        .catch((err) => returnError(res, err));
    })
    .catch((err) => returnError(res, err));

  // save the user
});

module.exports = router;
