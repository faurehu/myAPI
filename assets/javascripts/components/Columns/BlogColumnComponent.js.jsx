import BlogCardComponent from '../Cards/BlogCardComponent';
import ColumnComponent from './ColumnComponent';

export default class BlogColumnComponent extends ColumnComponent {
  static displayName = 'Blog Column Component';

  constructor(props) {
    super(props);
    this.state = {
      posts: props.posts
    };
  }

  getColumnClass() {
    return 'blog-column';
  }

  renderColumnHeader() {
    return;
  }

  renderCards() {
    let postCards = [<h1 key={0} className="column-title">Blog posts</h1>];
    this.state.posts.forEach((post) => {
      postCards.push(<BlogCardComponent title={post.title} id={post.id}
        subtitle={post.subtitle} key={this.state.posts.indexOf(post)+1}
        content={post.content}/>);
    });
    return postCards;
  }
}
