import XHRpromise from 'xhr-promise';
import ColumnComponent from './ColumnComponent';
import YoutubeCardComponent from '../Cards/YoutubeCardComponent';
let XHR = new XHRpromise;

export default class YoutubeColumnComponent extends ColumnComponent {
  static displayName = 'Image Column Component';

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let player;
    let onYouTubeIframeAPIReady = () => {
      console.log('yo');
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
    XHR.send({
      method: 'GET',
      url: `${window.location.href}api/youtube`
    })
    .then((response) => {
      this.setState({
        videos: JSON.parse(response.responseText)
      });
      this.forceUpdate();
    })
    .catch((error) => {
      console.log(error);
    });
  }

  getColumnClass() {
    return 'youtube-column';
  }

  renderCards() {
    let videoCards = [];
    if(this.state.videos !== undefined) {
      this.state.videos.forEach((video) => {
        videoCards.push(<YoutubeCardComponent media={video.media}
          id={video.id} title={video.title} key={this.state.videos.indexOf(video)}/>);
      });
    }
    return videoCards;
  }

  renderColumnHeader() {
    return (
      <div className="column-header">
        My Youtube Playlist
      </div>
    );
  }
}
