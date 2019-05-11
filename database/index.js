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

let findUser = (username, cb) => {
  Repo
    .find()
    .where('username').equals(username)
    .exec((err, data) => {
      if (err) {
        console.log(err);
      } else {
        cb(null, data);
      }
    });
}

let deleteUser = (username) => {
  Repo.deleteMany({ username: username }, (err) => {
    if (err) {
      console.log('not able to delete from db');
    } else {
      console.log(`deleted ${username} from db`);
    }
  });
}

module.exports.save = save;
module.exports.find = find;
module.exports.findUser = findUser;
module.exports.deleteUser = deleteUser;