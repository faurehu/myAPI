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
        <h1>{this.props.title}</h1>
        <p>{this.props.excerpt}</p>
      </div>
    );
  }

  redirect = () => {
    window.location = this.props.url;
  }
}
