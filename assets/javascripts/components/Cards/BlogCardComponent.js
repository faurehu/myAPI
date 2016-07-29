import React from 'react';
import marked from 'marked';

class BlogCardComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="card blog-card" onClick={this.redirect.bind(this)}>
        <div className="card-header">
          <h1>{this.props.title}</h1>
          <h2>{this.props.subtitle}</h2>
        </div>
        <div className="card-bottom">
          <p>
              {this.props.content}...
          </p>
        </div>
      </div>
    );
  }

  redirect() {
    window.location = `${window.location.origin}/blog/${this.props.id}`
  }
}

BlogCardComponent.displayName = 'Blog Card Component';
BlogCardComponent.propTypes = {
  title: React.PropTypes.string,
  subtitle: React.PropTypes.string,
  id: React.PropTypes.number,
  content: React.PropTypes.string
};

BlogCardComponent.defaultProps = {}

export default BlogCardComponent
