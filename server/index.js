const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const bodyParser = require('body-parser');

app.use(express.static(`${__dirname}/../public`));

const mediaProxy = createProxyMiddleware(
  {
    target: 'http://3.23.132.230:8000',
    changeOrigin: true,
  },
);

const sidebarProxy = createProxyMiddleware({
  target: 'http://52.14.114.30:1992',
  changeOrigin: true,
});

const announcementsProxy = createProxyMiddleware(
  {
    target: 'http://3.17.138.9:8080',
    changeOrigin: true,
  },
);

const reviewsProxy = createProxyMiddleware(
  {
    target: 'http://54.67.101.150:4200',
    changeOrigin: true,
  },
);

// proxy to media service
app.use(
  '/media',
  mediaProxy,
);

// proxy to siderbar service
app.use(
  '/mainBody',
  sidebarProxy,
);

// proxy to announcements service for random game
app.use(
  '/randomGame',
  announcementsProxy,
);

// proxy to announcements service for specific game
app.use(
  '/getGame',
  announcementsProxy,
);

// proxy to announcements service to patch likes
app.use(
  '/updateLikes',
  announcementsProxy,
);


// proxy to reviews service
app.use(
  '/api/reviews/:id',
  reviewsProxy,
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = app;
