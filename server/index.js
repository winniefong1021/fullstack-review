const express = require('express');
const bodyParser = require('body-parser');

const { getReposByUsername } = require('../helpers/github.js');

let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json())

app.post('/repos', function (req, res) {
  console.log('server post: ', req.body); // server post:  { username: 'winnie' }

  getReposByUsername(req.body.username, (err, data) => {
    if (err) {
      res.status(500).send('Unable to find github user');
    } else {
      res.status(201).send('Successfully saved user\'s repos');
    }
  });
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});

