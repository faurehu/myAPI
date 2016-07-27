import PocketCardComponent from '../Cards/PocketCardComponent';
import ColumnComponent from './ColumnComponent';

export default class PocketColumnComponent extends ColumnComponent {
  static displayName = 'Pocket Column Component';

  constructor(props) {
    super(props);
    this.state = {
      articles: props.articles
    };
  }

  getColumnClass() {
    return 'pocket-column';
  }

  renderColumnHeader() {
    return;
  }

  renderCards() {
    let pocketCards = [<h1 key={0} className="column-title">Pocket Favorites</h1>];
    this.state.articles.forEach((article) => {
      pocketCards.push(<PocketCardComponent url={article.url}
        title={article.title} excerpt={article.excerpt} key={this.state.articles.indexOf(article)+1}/>);
    });
    return pocketCards;
  }
}
