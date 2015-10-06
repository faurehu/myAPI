import React from 'react/addons';

export default class BlogCardComponent extends React.Component {
  static displayName = 'Blog Card Component';
  static propTypes = {
    title: React.PropTypes.string,
    subtitle: React.PropTypes.string,
    id: React.PropTypes.number
  };

  static defaultProps = {}

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="card blog-card" onClick={this.redirect}>
        <h1>{this.props.title}</h1>
        <h2>{this.props.subtitle}</h2>
      </div>
    );
  }

  redirect = () => {
    window.location = `${window.location.href}blog/${this.props.id}`
  }
}
