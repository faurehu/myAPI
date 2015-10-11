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
        <div className="card-bottom">
          <p>{this.props.description} |<b className="language"> {this.props.language}</b></p>
        </div>
      </div>
    );
  }

  redirect = () => {
    window.location = this.props.url
  }
}
