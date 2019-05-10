const request = require('request');
const config = require('../config.js');

let getReposByUsername = (user, cb) => {
  let options = {
    url: `https://api.github.com/users/${user}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request(options, (err, data) => {
    if (err) {
      cb(err);
    } else {
      cb(null, data);
    }
  });
}

module.exports.getReposByUsername = getReposByUsername;