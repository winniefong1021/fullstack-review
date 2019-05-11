import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      repos: [],
    };

    this.search = this.search.bind(this);
    this.getRepos = this.getRepos.bind(this);
  }

  search(term) {
    console.log(`${term} was searched`);
    axios.post('/repos', { username: term })
      .then(response => {
        this.getRepos();
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  getRepos() {
    axios.get('/repos')
      .then(res => {
        this.setState({ repos: res.data });
      })
      .catch(err => {
        console.log(err);
      })
  }

  componentDidMount() {
    this.getRepos();
  }

  render() {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search} />
      <RepoList repos={this.state.repos} />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));