const mysql = require('mysql');

module.exports.dbConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'fetcher'
});
 
module.exports.dbConnection.connect((err) => {
  if (err) {
    console.log('unable to connect to db');
  } else {
    console.log('connected to db');
  }
});

let save = (data) => {

}

let find = (data) => {

}

let findUser = (username, cb) => {

}

let deleteUser = (username) => {

}