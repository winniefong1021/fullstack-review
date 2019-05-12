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
  dbConnection.query(`INSERT IGNORE INTO users (userID, username) VALUES (${data.users_id}, '${data.username}')`, (err, results) => {
    if (err) {
      console.log(err);
    }

    let options = data;
    delete options.username;

    dbConnection.query('INSERT INTO repos SET ?', options, (err, results) => {
      if (err) {
        console.log(err);
      }
      console.log('repos saved');
    });
    console.log('saved to db');
  });
}

let find = (data) => {

}

let findUser = (username, cb) => {

}

let deleteUser = (username) => {

}

module.exports = {
  save: save,
};