import React from 'react/addons';

export default class YoutubeCardComponent extends React.Component {
  static displayName = 'Youtube Card Component';
  static propTypes = {
    media: React.PropTypes.string,
    title: React.PropTypes.string,
    id: React.PropTypes.number
  };

  static defaultProps = {}

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="card youtube-card">
        <img src={this.props.media}/>
        <h1>{this.props.title}</h1>
      </div>
    );
  }
}
