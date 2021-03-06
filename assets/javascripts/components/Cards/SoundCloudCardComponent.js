import React from 'react';

class SoundCloudCardComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="card soundcloud-card"
            onClick={this.changePlayer.bind(this)}>
        <img src={this.props.media}/>
        <div className="soundcloud-titles">
          <p>{this.props.title}</p>
          <p className="title">{this.props.user}</p>
        </div>
      </div>
    );
  }

  changePlayer() {
    let widgetIframe = document.getElementById('sc-widget');
    let widget = SC.Widget(widgetIframe);

    widget.getCurrentSound((currentSound) => {
      if(currentSound.id !== this.props.id) {
        widget.load(`${this.props.url}&amp;auto_play=true&amp;buying=false&amp;liking=false&amp;download=false&amp;sharing=false&amp;show_artwork=false&amp;show_comments=false&amp;show_playcount=false&amp;show_user=true&amp;hide_related=false&amp;visual=false&amp;start_track=0&amp;callback=true`);
      }
    });
  }
}

SoundCloudCardComponent.displayName = 'SoundCloud Card Component';
SoundCloudCardComponent.propTypes = {
  media: React.PropTypes.string,
  url: React.PropTypes.string,
  user: React.PropTypes.string,
  title: React.PropTypes.string,
  id: React.PropTypes.number
};

SoundCloudCardComponent.defaultProps = {}

export default SoundCloudCardComponent
