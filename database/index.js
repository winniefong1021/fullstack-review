const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  repoID: Number,
  userID: Number,
  username: String,
  repoName: String,
  url: String,
  forks: Number,
  stars: Number,
  watch: Number,
  avatar: String,
});

// seed db with test data:
// gordonmzhu
// tongueroo
// sayrer

let Repo = mongoose.model('Repo', repoSchema);

let save = (data) => {
  Repo.create(data, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('repo saved to db');
    }
  });
}

let find = (cb) => {
  Repo
    .find()
    .where('forks').gt(0)
    .limit(25)
    .sort('-forks')
    .exec((err, data) => {
      if (err) {
        console.log(err);
      } else {
        cb(null, data);
      }
    });
}

module.exports.save = save;
module.exports.find = find;
