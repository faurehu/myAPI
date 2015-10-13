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
    XHR.send({
      method: 'GET',
      url: `${window.location.origin}/api/instagram`
    })
    .then((response) => {
      this.setState({
        images: JSON.parse(response.responseText)
      });
      this.forceUpdate();
    })
    .catch((error) => {
      console.log(error);
    });
  }

  getColumnClass() {
    return 'instagram-column';
  }

  renderCards() {
    let imageCards = [<h1 key={0} className="column-title">Instagram</h1>];
    if(this.state.images !== undefined) {
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
}
