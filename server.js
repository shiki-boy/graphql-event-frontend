const express = require('express');
const serveStatic = require("serve-static")
const path = require('path');

app = express();

app.use(serveStatic(path.join(__dirname, '/dist')));

const port = process.env.PORT || 5000;

// Catch all routes and redirect to the index file
app.get('*', function (req, res) {
  res.sendFile(__dirname + '/dist/index.html')
})

app.listen(port, () => {
  console.log('Listening on port ' + port)
});