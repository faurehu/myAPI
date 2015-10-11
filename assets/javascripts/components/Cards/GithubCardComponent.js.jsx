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
      <div className="card github-card" onClick={this.redirect}>
        <div className="card-header">
          <h1>{this.props.name}</h1>
        </div>
        <p>{this.props.description} | {this.props.language}</p>
      </div>
    );
  }

  redirect = () => {
    window.location = this.props.url
  }
}
