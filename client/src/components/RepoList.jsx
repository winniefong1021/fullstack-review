import React from 'react';

const RepoList = (props) => {
  const repos = props.repos.map(repo => {
    return (
      <div id="repo" key={repo.repoID}>
        <img src={repo.avatar} alt="user-avatar" />
        <ul>
          <li id="username">{repo.username}</li>
          <li id="repo-name">
            <a href={repo.url} target="_blank">{repo.repoName}
            </a>
          </li>
          <li>forks: {repo.forks}</li>
          <li>stars: {repo.stars}</li>
          <li>watch: {repo.watch}</li>
        </ul>
      </div>
    );
  });

  return (
    <div id="repo-list">
      <h4>Top 25 Forked Repos</h4>
      {repos}
    </div>
  );
};

export default RepoList;