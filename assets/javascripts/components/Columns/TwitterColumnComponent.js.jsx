import XHRpromise from 'xhr-promise';
import TwitterCardComponent from '../Cards/TwitterCardComponent';
import ColumnComponent from './ColumnComponent';
let XHR = new XHRpromise;

export default class TwitterColumnComponent extends ColumnComponent {
  static displayName = 'Twitter Column Component';

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.reload();
  }

  getColumnClass() {
    return 'twitter-column';
  }

  renderColumnHeader() {
    return;
  }

  renderCards() {
    let tweetCards = [<h1 key={0} className="column-title">Twitter</h1>];
    if(this.state.empty) {
      tweetCards.push(<div className="reload-div"><h2>There has been a disconnection</h2><h2 className="reload-click" onClick={this.reload}>Try again?</h2></div>);
    } else if (this.state.tweets !== undefined) {
      this.state.tweets.forEach((tweet) => {
        tweetCards.push(<TwitterCardComponent text={tweet.text || tweet.myText}
          author={tweet.author} media={tweet.imgUrl} key={this.state.tweets.indexOf(tweet)+1}/>);
      });
    }
    return tweetCards;
  }

  reload = () => {
    XHR.send({
      method: 'GET',
      url: `${window.location.origin}/api/twitter`
    })
    .then((response) => {
      this.setState({
        tweets: JSON.parse(response.responseText),
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
