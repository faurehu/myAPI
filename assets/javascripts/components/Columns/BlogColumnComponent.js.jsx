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
    XHR.send({
      method: 'GET',
      url: `${window.location.href}api/blog`
    })
    .then((response) => {
      this.setState({
        posts: JSON.parse(response.responseText)
      });
      this.forceUpdate();
    })
    .catch((error) => {
      console.log(error);
    });
  }

  getColumnClass() {
    return 'blog-column';
  }

  renderColumnHeader() {
    return (
      <div className="column-header">
        My Posts
      </div>
    );
  }

  renderCards() {
    let postCards = [];
    if(this.state.posts !== undefined) {
      this.state.posts.forEach((post) => {
        postCards.push(<BlogCardComponent title={post.title}
          subtitle={post.subtitle} key={this.state.posts.indexOf(post)}/>);
      });
    }
    return postCards;
  }
}
