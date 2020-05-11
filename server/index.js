const express = require('express');
const { proxy } = require('http-proxy-middleware');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '../public')));

// render html
app.get('/games/:id', (req, res) => {
  const react = path.join(__dirname, '../public/index.html');
  res.sendFile(react);
});

// proxy to reviews server
app.use(
  '/api/games/:id',
  proxy({
    target: 'http://localhost:4200',
    changeOrigin: true,
  }),
);

module.exports = app;
