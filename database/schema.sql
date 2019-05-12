DROP DATABASE IF EXISTS fetcher;

CREATE DATABASE fetcher;

USE fetcher;

CREATE TABLE users (
  userID INT NOT NULL,
  username VARCHAR(20) NOT NULL,
  PRIMARY KEY(userID)
);

CREATE TABLE repos (
  id INT NOT NULL AUTO_INCREMENT,
  repoID INT NOT NULL,
  users_id INT NOT NULL,
  repoName VARCHAR(100) NOT NULL,
  repo_url VARCHAR(300) NOT NULL,
  forks INT NOT NULL,
  stars INT NOT NULL,
  watch INT NOT NULL,
  avatar VARCHAR(300) NOT NULL,
  FOREIGN KEY(users_id) REFERENCES users(userID),
  PRIMARY KEY(id)
);