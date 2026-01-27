const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const productRouter = require('./Routes/productRouter');

require('dotenv').config();
require('./Models/db');

app.use(bodyParser.json());
app.use(cors());

app.get('/ping', (req, res) => {
  res.send('Hello World!');
});

app.use('/auth', AuthRouter);
app.use('/products', productRouter);

module.exports = app;
