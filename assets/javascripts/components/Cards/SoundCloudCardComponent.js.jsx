import React from 'react/addons';

export default class SoundCloudCardComponent extends React.Component {
  static displayName = 'SoundCloud Card Component';
  static propTypes = {
    media: React.PropTypes.string,
    url: React.PropTypes.string,
    user: React.PropTypes.string,
    title: React.PropTypes.string,
    changePlayer: React.PropTypes.func
  };

  static defaultProps = {}

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="card -card" onClick={this.props.changePlayer.bind(null, this.props.url)}>
        <img src={this.props.media}/>
        <span>{this.props.title}</span>
        <span>{this.props.user}</span>
      </div>
    );
  }
}
