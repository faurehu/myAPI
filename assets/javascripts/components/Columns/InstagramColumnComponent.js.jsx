import XHRpromise from 'xhr-promise';
import ColumnComponent from './ColumnComponent';
import InstagramCardComponent from '../Cards/InstagramCardComponent';
let XHR = new XHRpromise;

export default class InstagramColumnComponent extends ColumnComponent {
  static displayName = 'Instagram Column Component';

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    !isMobile() && this.reload();
  }

  getColumnClass() {
    return 'instagram-column';
  }

  renderCards() {
    let imageCards = [<h1 key={0} className="column-title">Instagram</h1>];
    if(this.state.empty) {
      imageCards.push(<div className="reload-div"><h2>There has been a disconnection</h2><h2 className="reload-click" onClick={this.reload}>Try again?</h2></div>);
    } else if (this.state.images !== undefined) {
      this.state.images.forEach((image) => {
        imageCards.push(<InstagramCardComponent link={image.link}
          url={image.url} key={this.state.images.indexOf(image)+1}/>);
      });
    }
    return imageCards;
  }

  renderColumnHeader() {
    return;
  }

  reload = () => {
    XHR.send({
      method: 'GET',
      url: `${window.location.origin}/api/instagram`
    })
    .then((response) => {
      this.setState({
        images: JSON.parse(response.responseText),
        empty: response.status === 500
      });
      this.forceUpdate();
    })
    .catch((error) => {
      this.setState({
        empty: true
      })
    });
  }
}
