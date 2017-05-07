const express = require('express');
const config = require('../config/config');
const api = require('./api/api');
const db = require('mongoose');
const bluebird = require('bluebird')

const app = express();

db.Promise = bluebird;
db.connect(config.db.url);

if (config.seed) {
  require('./services/seed');
}

require('./middleware/appMiddleware')(app)

app.use('/api', api);

module.exports = app;