import ColumnComponent from './ColumnComponent';
import YoutubeCardComponent from '../Cards/YoutubeCardComponent';

export default class YoutubeColumnComponent extends ColumnComponent {
  static displayName = 'Youtube Column Component';

  constructor(props) {
    super(props);
    this.state = {
      videos: props.videos
    };
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
  }

  getColumnClass() {
    return 'youtube-column';
  }

  renderCards() {
    let videoCards = [<h1 key={0} className="column-title">Youtube Playlist</h1>];
    this.state.videos.forEach((video) => {
      videoCards.push(<YoutubeCardComponent media={video.media}
        id={video.id} title={video.title} key={this.state.videos.indexOf(video)+1}/>);
    });
    return videoCards;
  }

  renderColumnHeader() {
    return;
  }
}
