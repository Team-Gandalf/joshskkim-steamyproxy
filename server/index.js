const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const bodyParser = require('body-parser');

app.use(express.static(`${__dirname}/../public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mediaProxy = createProxyMiddleware(
  {
    target: 'http://localhost:8000',
    changeOrigin: true,
  },
);

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

// proxy to media service
app.use(
  '/media',
  mediaProxy,
);

// // proxy to announcements service
// app.use(
//   'randomGame',
//   announcementsProxy,
// );

// proxy to reviews service
app.use(
  '/api/reviews/:id',
  reviewsProxy,
);

module.exports = app;
