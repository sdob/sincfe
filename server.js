const path = require('path');
const express = require('express');

const port = process.env.PORT;
const app = express();

app.use(express.static(__dirname + '/build'));
app.get('*', function response(req, res) {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
});
