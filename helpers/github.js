const request = require('request');
const config = require('../config.js');

let getReposByUsername = (user, cb) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL

  // GET /users/:username/repos

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
      return;
    }
    console.log('data: ', data);
    cb(data);
  });

}

module.exports.getReposByUsername = getReposByUsername;