const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('config');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const uri = config.get('mongoURI');

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('connect to MongoDB'))
  .catch((err) => console.log(err));

const port = process.env.PORT || 2802;

const userRoute = require('./routes/user');
const attackRoute = require('./routes/attack');

app.use('/users', userRoute);
app.use('/attacks', attackRoute);

// default routing
app.use(function (req, res, next) {
  res.status(400).json('File not found');
});

app.listen(port, () => console.log(`start listening on port ${port}`));
