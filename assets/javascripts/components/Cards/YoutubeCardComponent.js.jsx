import React from 'react/addons';

export default class YoutubeCardComponent extends React.Component {
  static displayName = 'Youtube Card Component';
  static propTypes = {
    media: React.PropTypes.string,
    title: React.PropTypes.string,
    id: React.PropTypes.string
  };

  static defaultProps = {}

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="card youtube-card" onClick={this.redirect}>
        <img src={this.props.media}/>
        <div className="card-bottom">
          <h2>{this.props.title}</h2>
        </div>
      </div>
    );
  }

  redirect = () => {
    window.location = `https://www.youtube.com/watch?v=${this.props.id}`;
  }
}
