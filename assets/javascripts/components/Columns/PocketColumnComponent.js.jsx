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
    XHR.send({
      method: 'GET',
      url: `${window.location.href}api/pocket/0`
    })
    .then((response) => {
      this.setState({
        articles: JSON.parse(response.responseText)
      });
      this.forceUpdate();
    })
    .catch((error) => {
      console.log(error);
    });
  }

  getColumnClass() {
    return 'pocket-column';
  }

  renderColumnHeader() {
    return;
  }

  renderCards() {
    let pocketCards = [<h1 className="column-title">Pocket Favorites</h1>];
    if(this.state.articles !== undefined) {
      this.state.articles.forEach((article) => {
        pocketCards.push(<PocketCardComponent url={article.url}
          title={article.title} excerpt={article.excerpt} key={this.state.articles.indexOf(article)}/>);
      });
    }
    return pocketCards;
  }
}
