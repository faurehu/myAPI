import XHRpromise from 'xhr-promise';
import PocketCardComponent from '../Cards/PocketCardComponent';
import ColumnComponent from './ColumnComponent';
let XHR = new XHRpromise;

export default class PocketColumnComponent extends ColumnComponent {
  static displayName = 'Pocket Column Component';

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.reload();
  }

  getColumnClass() {
    return 'pocket-column';
  }

  renderColumnHeader() {
    return;
  }

  renderCards() {
    let pocketCards = [<h1 key={0} className="column-title">Pocket Favorites</h1>];
    if(this.state.empty) {
      pocketCards.push(<div className="reload-div"><h2>There has been a disconnection</h2><h2 className="reload-click" onClick={this.reload}>Try again?</h2></div>);
    } else if (this.state.articles !== undefined) {
      this.state.articles.forEach((article) => {
        pocketCards.push(<PocketCardComponent url={article.url}
          title={article.title} excerpt={article.excerpt} key={this.state.articles.indexOf(article)+1}/>);
      });
    }
    return pocketCards;
  }

  reload = () => {
    XHR.send({
      method: 'GET',
      url: `${window.location.origin}/api/pocket/0`
    })
    .then((response) => {
      this.setState({
        articles: JSON.parse(response.responseText),
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
