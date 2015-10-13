import React from 'react/addons';
import marked from 'marked';

export default class BlogCardComponent extends React.Component {
  static displayName = 'Blog Card Component';
  static propTypes = {
    title: React.PropTypes.string,
    subtitle: React.PropTypes.string,
    id: React.PropTypes.number,
    content: React.PropTypes.string
  };

  static defaultProps = {}

  constructor(props) {
    super(props);
  }

  render() {
    let html = marked(this.props.content);
    let tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    let snippet = tmp.textContent || tmp.innerText || '';

    return (
      <div className="card blog-card" onClick={this.redirect}>
        <div className="card-header">
          <h1>{this.props.title}</h1>
          <h2>{this.props.subtitle}</h2>
        </div>
        <div className="card-bottom">
          <p>{`${snippet.substring(0, 150)}...`}</p>
        </div>
      </div>
    );
  }

  redirect = () => {
    window.location = `${window.location.origin}/blog/${this.props.id}`
  }
}
