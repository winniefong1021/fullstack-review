const express = require('express');
const bodyParser = require('body-parser');

const { getReposByUsername } = require('../helpers/github.js');
const { save } = require('../database/index.js');

let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json())

app.post('/repos', function (req, res) {
  getReposByUsername(req.body.username, (err, data) => {
    if (err) {
      res.status(500).send('Unable to find github user');
    } else {
      let userRepos = JSON.parse(data.body);

      for (let i = 0; i < userRepos.length; i++) {
        let repo = {
          repoID: userRepos[i].id,
          userID: userRepos[i].owner.id,
          username: userRepos[i].owner.login,
          repoName: userRepos[i].name,
          url: userRepos[i].html_url,
          forks: userRepos[i].forks,
          stars: userRepos[i].stargazers_count,
          watch: userRepos[i].watchers,
        };

        save(repo);
      }

      res.status(201).send('Successfully saved user\'s repos');
    }
  });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});

