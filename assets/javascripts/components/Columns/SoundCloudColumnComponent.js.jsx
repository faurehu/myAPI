import XHRpromise from 'xhr-promise';
import ColumnComponent from './ColumnComponent';
import SoundCloudCardComponent from '../Cards/SoundCloudCardComponent';
let XHR = new XHRpromise;

export default class SoundCloudColumnComponent extends ColumnComponent {
  static displayName = 'SoundCloud Column Component';

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    XHR.send({
      method: 'GET',
      url: `${window.location.href}api/soundcloud`
    })
    .then((response) => {
      let tracks = JSON.parse(response.responseText);
      this.setState({
        tracks: tracks,
        player: tracks[0].url
      });
      this.forceUpdate();
    })
    .catch((error) => {
      console.log(error);
    });
  }

  getColumnClass() {
    return 'soundcloud-column';
  }

  renderCards() {
    let trackCards = [];
    if(this.state.tracks !== undefined) {
      this.state.tracks.forEach((track) => {
        trackCards.push(<SoundCloudCardComponent title={track.title}
          media={track.media} user={track.user} url={track.url}
          key={this.state.tracks.indexOf(track)}
          changePlayer={this.changePlayer}/>);
      });
    }
    return trackCards;
  }

  renderColumnHeader() {
    if(this.state.tracks !== undefined) {
      let src = `https://w.soundcloud.com/player/?url=${this.state.player}&amp;auto_play=false&amp;buying=false&amp;liking=false&amp;download=false&amp;sharing=false&amp;show_artwork=false&amp;show_comments=false&amp;show_playcount=false&amp;show_user=true&amp;hide_related=false&amp;visual=false&amp;start_track=0&amp;callback=true`
      return (
        <div className="column-header soundcloud-header">
          <iframe id="sc-widget" src={src}
            width="100%" height="120" scrolling="no" frameBorder="no"></iframe>
        </div>
      );
    }
  }

  changePlayer = (url) => {
    this.setState({
      player: url
    });
  }
}
