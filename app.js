const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const logger = require('morgan');

const setup = require('./api/route');

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Custom logger format
logger.token('status-format', (req, res) => {
  const status = res.statusCode;
  if (status >= 200 && status < 300) {
    return '🟢';
  } else if (status >= 300 && status < 400) {
    return '🔵';
  } else {
    return '🔴';
  }
});
app.use(logger(':method :url :status-format :status :response-time ms'));

const port = 8020;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const dbUri = process.env.DB_URI;
mongoose
  .connect(dbUri)
  .then(() => {
    console.log('Database connected');
  })
  .catch((error) => {
    console.log('db error', error);
    process.exit(1);
  });


setup(app)

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
