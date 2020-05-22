const Router = require('express').Router();
let User = require('../models/user');

function returnError(res, err) {
  res.status(400).json('Error: ' + err);
}

Router.route('/').get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch(returnError(res, err));
});

Router.route('/add').post((req, res) => {
  const username = req.body.username;
  const newUser = new User({ username });

  newUser.save
    .then(() => {
      res.json('User added!');
    })
    .catch(returnError(res, err));
});
