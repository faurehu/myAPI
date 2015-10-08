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
    XHR.send({
      method: 'GET',
      url: `${window.location.href}api/twitter`
    })
    .then((response) => {
      this.setState({
        tweets: JSON.parse(response.responseText)
      });
      this.forceUpdate();
    })
    .catch((error) => {
      console.log(error);
    });
  }

  getColumnClass() {
    return 'twitter-column';
  }

  renderColumnHeader() {
    return (
      <div className="column-header">
        My Tweets
      </div>
    );
  }

  renderCards() {
    let tweetCards = [];
    if(this.state.tweets !== undefined) {
      this.state.tweets.forEach((tweet) => {
        tweetCards.push(<TwitterCardComponent text={tweet.text || tweet.myText}
          author={tweet.author} media={tweet.imgUrl} key={this.state.tweets.indexOf(tweet)}/>);
      });
    }
    return tweetCards;
  }
}
