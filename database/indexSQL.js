const mysql = require('mysql');

const dbConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'fetcher'
});
 
dbConnection.connect((err) => {
  if (err) {
    console.log('unable to connect to db');
  } else {
    console.log('connected to db');
  }
});

let save = (data) => {
  dbConnection.query(`INSERT IGNORE INTO users (userID, username) VALUES (${data.users_id}, '${data.username}')`, (err) => {
    if (err) {
      console.log(err);
    }

    let options = data;
    delete options.username;

    dbConnection.query('INSERT INTO repos SET ?', options, (err) => {
      if (err) {
        console.log(err);
      }
      console.log('repos saved to db');
    });
  });
}

let find = (cb) => {
  dbConnection.query('SELECT * FROM repos INNER JOIN users ON repos.users_id = users.userID WHERE forks > 0 ORDER BY forks DESC LIMIT 25', (err, data) => {
    if (err) {
      cb(err);
    } else {
      cb(null, data);
    }
  });
}

let deleteUser = (username) => {
  dbConnection.query(`DELETE repos FROM repos LEFT JOIN users ON repos.users_id = users.userID WHERE users.username = '${username}'`, (err) => {
    if (err) {
      console.log(err);
    }
    console.log('deleted user\'s repos');
  });
}

module.exports = {
  save: save,
  deleteUser: deleteUser,
  find, find
};