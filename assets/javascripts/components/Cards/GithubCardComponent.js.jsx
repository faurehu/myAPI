import React from 'react/addons';

export default class GithubCardComponent extends React.Component {
  static displayName = 'Github Card Component';
  static propTypes = {
    name: React.PropTypes.string,
    description: React.PropTypes.string,
    url: React.PropTypes.string,
    language: React.PropTypes.string
  };

  static defaultProps = {}

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="card blog-card" onClick={this.redirect}>
        <h1>{this.props.name}</h1>
        <p>{this.props.description}</p>
        <span>{this.props.language}</span>
      </div>
    );
  }

  redirect = () => {
    window.location = this.props.url
  }
}
