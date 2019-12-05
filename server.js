'use strict';

var api = require('./api');

const express = require('express');

// Constants
const PORT = 8888;
const HOST = '0.0.0.0';

// App
const app = express();

app.use(express.static('static'))

app.get('/api/', (req, res) => {
  api.calculate(req, res);
  res.send('Hello world\n');
});


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);