import React from 'react';
import GithubCardComponent from '../Cards/GithubCardComponent';
import ColumnComponent from './ColumnComponent';

class GithubColumnComponent extends ColumnComponent {
  constructor(props) {
    super(props);
    this.state = {
      repos: props.repos
    };
  }

  getColumnClass() {
    return 'github-column';
  }

  renderColumnHeader() {
    return;
  }

  renderCards() {
    let repos = [<h1 key={0} className="column-title">Github Repos</h1>];
    this.state.repos.forEach((repo) => {
      repos.push(<GithubCardComponent name={repo.name} url={repo.url}
        language={repo.language} description={repo.description}
        key={this.state.repos.indexOf(repo)+1}/>);
    });
    return repos;
  }
}

GithubColumnComponent.displayName = 'Github Column Component';
export default GithubColumnComponent
