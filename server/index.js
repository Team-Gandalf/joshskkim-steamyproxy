const express = require('express');
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const bodyParser = require('body-parser');

app.use(morgan('dev'));
app.use(express.static(`${__dirname}/../public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const announcementsProxy = createProxyMiddleware(
//   {
//     target: 'http://localhost:4200',
//     changeOrigin: true,
//   },
// );

const reviewsProxy = createProxyMiddleware(
  {
    target: 'http://localhost:4200',
    changeOrigin: true,
  },
);

// // proxy to announcements service
// app.use(
//   'randomGame',
//   announcementsProxy,
// );

proxy to reviews service
app.use(
  '/api/reviews/:id',
  reviewsProxy,
);

module.exports = app;
