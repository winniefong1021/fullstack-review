import React from 'react';

const RepoList = (props) => {
  const repos = props.repos.map(repo => {
    return (
      <tr key={repo.repoID} >
        <td>{repo.username}</td>
        <td>
          <a href={repo.url} target="_blank">{repo.repoName}</a>
        </td>
        <td>{repo.forks}</td>
      </tr>
    );
  });

  return (
    <div>
      <h4> Repo List Component </h4>
      There are {props.repos.length} repos.
      <table id="repo-list">
        <thead>
          <tr>
            <th>Username</th>
            <th>Repo Name</th>
            <th>Fork Count</th>
          </tr>
        </thead>
        <tbody>
          {repos}
        </tbody>
      </table>
    </div >
  );
};

export default RepoList;