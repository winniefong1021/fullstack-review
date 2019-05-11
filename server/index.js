const express = require('express');
const bodyParser = require('body-parser');

const { getReposByUsername } = require('../helpers/github.js');
const { save, find, findUser, deleteUser } = require('../database/index.js');

let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json())

app.post('/repos', function (req, res) {
  findUser(req.body.username, (err, data) => {
    if (err) {
      res.status(404).send('User not found');
    } else {
      deleteUser(req.body.username);
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
              avatar: userRepos[i].owner.avatar_url,
            };
    
            save(repo);
          }
    
          res.status(201).send('Successfully saved user\'s repos');
        }
      });
    }
  });
});

app.get('/repos', function (req, res) {
  find((err, data) => {
    if (err) {
      res.status(404).send('Not able to retrieve repos from db');
    } else {
      res.status(200).send(data);
    }
  });
});

let port = 1128;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});

