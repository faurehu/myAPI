import XHRpromise from 'xhr-promise';
import ColumnComponent from './ColumnComponent';
import YoutubeCardComponent from '../Cards/YoutubeCardComponent';
let XHR = new XHRpromise;

export default class YoutubeColumnComponent extends ColumnComponent {
  static displayName = 'Youtube Column Component';

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let player;
    let onYouTubeIframeAPIReady = () => {
      player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: 'M7lc1UVf-VE',
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      });
    }
    !isMobile() && this.reload();
  }

  getColumnClass() {
    return 'youtube-column';
  }

  renderCards() {
    let videoCards = [<h1 key={0} className="column-title">Youtube Playlist</h1>];
    if(this.state.empty) {
      videoCards.push(<div className="reload-div"><h2>There has been a disconnection</h2><h2 className="reload-click" onClick={this.reload}>Try again?</h2></div>);
    } else if (this.state.videos !== undefined) {
      this.state.videos.forEach((video) => {
        videoCards.push(<YoutubeCardComponent media={video.media}
          id={video.id} title={video.title} key={this.state.videos.indexOf(video)+1}/>);
      });
    }
    return videoCards;
  }

  renderColumnHeader() {
    return;
  }

  reload = () => {
    XHR.send({
      method: 'GET',
      url: `${window.location.origin}/api/youtube`
    })
    .then((response) => {
      this.setState({
        videos: JSON.parse(response.responseText),
        empty: response.status === 500
      });
      this.forceUpdate();
    })
    .catch((error) => {
      this.setState({
        emptty: true
      });
    });
  }
}
