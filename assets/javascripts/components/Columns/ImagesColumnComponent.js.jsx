import XHRpromise from 'xhr-promise';
import ColumnComponent from './ColumnComponent';
import ImageCardComponent from '../Cards/ImageCardComponent';
let XHR = new XHRpromise;

export default class ImageColumnComponent extends ColumnComponent {
  static displayName = 'Image Column Component';

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    XHR.send({
      method: 'GET',
      url: `${window.location.href}api/photo`
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
    return 'images-column';
  }

  renderCards() {
    let imageCards = [];
    if(this.state.images !== undefined) {
      this.state.images.forEach((image) => {
        imageCards.push(<ImageCardComponent caption={image.caption} id={image.id}
          url={image.medium} key={this.state.images.indexOf(image)}/>);
      });
    }
    return imageCards;
  }

  renderColumnHeader() {
    return (
      <div className="column-header">
        My Photography
      </div>
    );
  }
}
