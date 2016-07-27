import ColumnComponent from './ColumnComponent';
import SoundCloudCardComponent from '../Cards/SoundCloudCardComponent';

export default class SoundCloudColumnComponent extends ColumnComponent {
  static displayName = 'SoundCloud Column Component';

  constructor(props) {
    super(props);
    this.state = {
      tracks: props.tracks
    };
  }

  getColumnClass() {
    return 'soundcloud-column';
  }

  renderCards() {
    let trackCards = [];
    this.state.tracks.forEach((track) => {
      trackCards.push(<SoundCloudCardComponent title={track.title}
        media={track.media} user={track.user} url={track.url}
        key={this.state.tracks.indexOf(track)} id={track.id} />);
    });
    return trackCards;
  }

  renderColumnHeader() {
    let src = `https://w.soundcloud.com/player/?url=${this.state.tracks[0].url}&amp;auto_play=false&amp;buying=false&amp;liking=false&amp;download=false&amp;sharing=false&amp;show_artwork=false&amp;show_comments=false&amp;show_playcount=false&amp;show_user=true&amp;hide_related=false&amp;visual=false&amp;start_track=0&amp;callback=true`
    return (
      <div className="column-header soundcloud-header">
        <iframe id="sc-widget" src={src}
          width="300" height="120" scrolling="no" frameBorder="no"></iframe>
      </div>
    );
  }

  render() {
    return (
      <div className={`column ${this.getColumnClass()}`}>
        <div className="column-content">
          {this.renderColumnHeader()}
          {this.renderCards()}
        </div>
      </div>
    );
  }
}
