const router = require('express').Router();
const bcryptjs = require('bcryptjs');
let User = require('../models/user');

function getHash(password) {
  try {
    salt = bcryptjs.getSalt(10);
    return bcryptjs.hash(salt, password);
  } catch {
    throw "can't generate hash for password";
  }
}

function returnError(res, err) {
  res.status(400).json('Error: ' + err);
}

router.route('/').get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  //const firstName = req.body.name;
  const newUser = new User(req.body);
  newUser.password = getHash(newUser.password);
  newUser
    .save()
    .then(() =>
      res.json({
        user: { id: newUser.id, name: newUser.name, email: newUser.email },
      })
    )
    .catch((err) => returnError(res, err));
});

module.exports = router;
