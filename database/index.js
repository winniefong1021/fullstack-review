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
  watch: Number
});

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

module.exports.save = save;
