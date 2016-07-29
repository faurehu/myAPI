import React from 'react';

class YoutubeCardComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="card youtube-card" onClick={this.redirect.bind(this)}>
        <img alt={this.props.title} src={this.props.media}/>
        <div className="card-bottom">
          <h2>{this.props.title}</h2>
        </div>
      </div>
    );
  }

  redirect() {
    window.location = `https://www.youtube.com/watch?v=${this.props.id}`;
  }
}

YoutubeCardComponent.displayName = 'Youtube Card Component';
YoutubeCardComponent.propTypes = {
  media: React.PropTypes.string,
  title: React.PropTypes.string,
  id: React.PropTypes.string
};

YoutubeCardComponent.defaultProps = {}

export default YoutubeCardComponent
