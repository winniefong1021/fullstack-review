import React from 'react';

const RepoList = (props) => {
  const repos = props.repos.map(repo => {
    return (
      <tr key={repo.repoID} >
        <td>{repo.username}</td>
        <td>{repo.repoName}</td>
        <td>{repo.forks}</td>
      </tr>
    );
  });

  return (
    <div>
      <h4> Repo List Component </h4>
      There are {props.repos.length} repos.
      <table>
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