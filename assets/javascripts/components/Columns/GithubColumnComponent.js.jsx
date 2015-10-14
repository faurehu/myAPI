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
    this.reload();
  }

  getColumnClass() {
    return 'github-column';
  }

  renderColumnHeader() {
    return;
  }

  renderCards() {
    let repos = [<h1 key={0} className="column-title">Github Repos</h1>];
    if(this.state.empty) {
      repos.push(<div className="reload-div"><h2>There has been a disconnection</h2><h2 className="reload-click" onClick={this.reload}>Try again?</h2></div>);
    } else if (this.state.repos !== undefined) {
      this.state.repos.forEach((repo) => {
        repos.push(<GithubCardComponent name={repo.name} url={repo.url}
          language={repo.language} description={repo.description}
          key={this.state.repos.indexOf(repo)+1}/>);
      });
    }
    return repos;
  }

  reload = () => {
    XHR.send({
      method: 'GET',
      url: `${window.location.origin}/api/github`
    })
    .then((response) => {
      this.setState({
        repos: JSON.parse(response.responseText),
        empty: response.status === 500
      });
      this.forceUpdate();
    })
    .catch((error) => {
      this.setState({
        empty: true
      });
    });
  }
}
