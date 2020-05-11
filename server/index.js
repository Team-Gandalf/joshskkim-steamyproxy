const express = require('express');
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const bodyParser = require('body-parser');

app.use(morgan('dev'));
app.use(express.static(`${__dirname}/../public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const apiProxy = createProxyMiddleware(
  {
    target: 'http://localhost:4200',
    changeOrigin: true,
  },
);

// proxy to reviews server
app.use(
  '/api/reviews/:id',
  apiProxy,
);

module.exports = app;
