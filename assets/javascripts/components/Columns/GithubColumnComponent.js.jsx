import XHRpromise from 'xhr-promise';
import GithubCardComponent from '../Cards/GithubCardComponent';
import ColumnComponent from './ColumnComponent';
let XHR = new XHRpromise;

export default class GithubColumnComponent extends ColumnComponent {
  static displayName = 'Github Column Component';

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    XHR.send({
      method: 'GET',
      url: `${window.location.href}api/github`
    })
    .then((response) => {
      this.setState({
        repos: JSON.parse(response.responseText)
      });
      this.forceUpdate();
    })
    .catch((error) => {
      console.log(error);
    });
  }

  getColumnClass() {
    return 'github-column';
  }

  renderColumnHeader() {
    return (
      <div className="column-header">
        My Repos
      </div>
    );
  }

  renderCards() {
    let repos = [];
    if(this.state.repos !== undefined) {
      this.state.repos.forEach((repo) => {
        repos.push(<GithubCardComponent name={repo.name} url={repo.url}
          language={repo.language} description={repo.description}
          key={this.state.repos.indexOf(repo)}/>);
      });
    }
    return repos;
  }
}
