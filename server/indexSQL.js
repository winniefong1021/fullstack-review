const express = require('express');
const bodyParser = require('body-parser');

const { getReposByUsername } = require('../helpers/github.js');
const { save, deleteUser, find } = require('../database/indexSQL.js');

let app = express();
let port = 1129;

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json())

app.post('/repos', (req, res) => {
  deleteUser(req.body.username);
  getReposByUsername(req.body.username, (err, data) => {
    if (err) {
      res.status(500).end('Unable to find github user');
    } else {
      let userRepos = JSON.parse(data.body);

      for (let i = 0; i < userRepos.length; i++) {
        let repo = {
          repoID: userRepos[i].id,
          users_id: userRepos[i].owner.id,
          username: userRepos[i].owner.login,
          repoName: userRepos[i].name,
          repo_url: userRepos[i].html_url,
          forks: userRepos[i].forks,
          stars: userRepos[i].stargazers_count,
          watch: userRepos[i].watchers,
          avatar: userRepos[i].owner.avatar_url,
        };

        save(repo);
      }
    }
  });
})

app.get('/repos', (req, res) => {
  find((err, data) => {
    if (err) {
      res.status(404).send('not able to retrieve repos from db');
    }
    console.log('server received data: ', data);
    // need to fix client getRepos with Post
    res.status(201).send(data);
  });
})

app.listen(port, () => {
  console.log(`listening on port ${port}`);
})