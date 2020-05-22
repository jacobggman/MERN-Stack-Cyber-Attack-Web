const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const db = 'mongodb://127.0.0.1:27017';

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('connect to MongoDB'))
  .catch((err) => console.log(err));

const port = process.env.PORT || 2801;

app.listen(port, () => console.log(`start listening on port ${port}`));
