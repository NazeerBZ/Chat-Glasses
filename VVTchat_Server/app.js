const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes');
const constants = require('./constants');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
//db setup
mongoose.Promise = global.Promise;
if (process.env.NODE_ENV === 'test') {
  mongoose.connect(constants.DB_PATH_TEST, { useMongoClient: true });
}
else if (process.env.NODE_ENV === 'development') {
  mongoose.connect(constants.DB_PATH_DEV, { useMongoClient: true });
  const cors = require('cors');
  app.use(cors());
}
else {
  mongoose.connect(constants.DB_PATH_PROD, { useMongoClient: true });
}

// app.use(express.static(path.resolve(__dirname, 'client', 'build')));
//app setup
routes(app);

app.get('*', (req, res) => {
  res.render('index.ejs');
// res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

app.use((err, req, res, next) => {
  const message = err.errors && err.errors[Object.keys(err.errors)[0]].message;
  return res.send({ name: err.name, error: message || err.message });
});

module.exports = app;