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

router.route('/add').post((req, res) => {
  let newUser = new UserModel.User(req.body);

  if (!UserModel.validatePassword(newUser.password)) {
    returnError(res, UserModel.illegalPasswordMsg);
  }

  // hash password
  bcryptjs.genSalt(10, (err, salt) => {
    bcryptjs.hash(newUser.password, salt, (err, hash) => {
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
                  email: newUser.email,
                },
              });
            }
          );
        })
        .catch((err) => returnError(res, err));
    });
  });
});

router.route('/login').post((req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return returnError(res, 'Please enter all fields');
  }

  UserModel.User.findOne({ email }, (err, user) => {
    if (err) {
      throw err;
    }
    if (!user) {
      return returnError(res, 'User not found');
    }

    // check password
    bcryptjs.compare(password, user.password).then((result) => {
      if (!result) {
        return returnError(res, 'Invalid password');
      }

      jwt.sign(
        { user: user.id },
        config.get('jwtSecret'),
        {
          expiresIn: HOUR,
        },
        (err, token) => {
          if (err) throw err;
          return res.json({ token });
        }
      );
    });
  });
});

module.exports = router;
