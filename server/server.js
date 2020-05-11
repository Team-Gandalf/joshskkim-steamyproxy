const app = require('./index');

const port = process.env.PORT || 5678;

app.listen(port, () => {
  console.log('Server listening on port: ', port)
});
