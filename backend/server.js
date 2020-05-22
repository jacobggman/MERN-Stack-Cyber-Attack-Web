const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const uri = 'mongodb://127.0.0.1:27017';

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('connect to MongoDB'))
  .catch((err) => console.log(err));

const port = process.env.PORT || 2801;

const userRoute = require('./models/user');

app.use('/users', userRoute);

app.listen(port, () => console.log(`start listening on port ${port}`));
