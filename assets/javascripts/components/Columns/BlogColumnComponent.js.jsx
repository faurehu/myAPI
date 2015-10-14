import XHRpromise from 'xhr-promise';
import BlogCardComponent from '../Cards/BlogCardComponent';
import ColumnComponent from './ColumnComponent';
let XHR = new XHRpromise;

export default class BlogColumnComponent extends ColumnComponent {
  static displayName = 'Blog Column Component';

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.reload();
  }

  getColumnClass() {
    return 'blog-column';
  }

  renderColumnHeader() {
    return;
  }

  renderCards() {
    let postCards = [<h1 key={0} className="column-title">Blog posts</h1>];

    if (this.state.empty) {
      postCards.push(<div className="reload-div"><h2>There has been a disconnection</h2><h2 className="reload-click" onClick={this.reload}>Try again?</h2></div>);
    } else if (this.state.posts !== undefined) {
      this.state.posts.forEach((post) => {
        postCards.push(<BlogCardComponent title={post.title} id={post.id}
          subtitle={post.subtitle} key={this.state.posts.indexOf(post)+1}
          content={post.content}/>);
      });
    }
    return postCards;
  }

  reload = () => {
    XHR.send({
      method: 'GET',
      url: `${window.location.origin}/api/blog`
    })
    .then((response) => {
      this.setState({
        empty: response.status === 500,
        posts: JSON.parse(response.responseText)
      });
      this.forceUpdate();
    })
    .catch((error) => {
      this.setState({
        empty: true
      })
    });
  }
}
