/* eslint-disable no-console */

const app = require('./index');

const port = process.env.PORT || 5678;

app.listen(port, (error) => {
  if (error) {
    console.error('Server error', error);
  } else {
    console.log('Server listening on port: ', port);
  }
});
