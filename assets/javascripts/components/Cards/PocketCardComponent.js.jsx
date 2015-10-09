import React from 'react/addons';

export default class PocketCardComponent extends React.Component {
  static displayName = 'Pocket Card Component';
  static propTypes = {
    title: React.PropTypes.string,
    excerpt: React.PropTypes.string,
    url: React.PropTypes.string
  };

  static defaultProps = {}

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="card pocket-card" onClick={this.redirect}>
        <div className="card-header">
          <h1>{this.props.title}</h1>
        </div>
          <p>{this.props.excerpt}</p>
      </div>
    );
  }

  redirect = () => {
    window.location = this.props.url;
  }
}
