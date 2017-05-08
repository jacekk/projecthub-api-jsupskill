const express = require('express');
const config = require('../config/config');
const api = require('./api/api');

const app = express();

require('./middleware/appMiddleware')(app)

app.use('/api', api);

module.exports = app;