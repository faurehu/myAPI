import TwitterCardComponent from '../Cards/TwitterCardComponent';
import ColumnComponent from './ColumnComponent';

export default class TwitterColumnComponent extends ColumnComponent {
  static displayName = 'Twitter Column Component';

  constructor(props) {
    super(props);
    this.state = {
      tweets: props.tweets
    };
  }

  getColumnClass() {
    return 'twitter-column';
  }

  renderColumnHeader() {
    return;
  }

  renderCards() {
    let tweetCards = [<h1 key={0} className="column-title">Twitter</h1>];
    this.state.tweets.forEach((tweet) => {
      tweetCards.push(<TwitterCardComponent text={tweet.text}
        rt={tweet.rt} img={tweet.img} key={this.state.tweets.indexOf(tweet)+1}/>);
    });
    return tweetCards;
  }
}
