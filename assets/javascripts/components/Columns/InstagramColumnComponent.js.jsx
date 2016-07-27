import ColumnComponent from './ColumnComponent';
import InstagramCardComponent from '../Cards/InstagramCardComponent';

export default class InstagramColumnComponent extends ColumnComponent {
  static displayName = 'Instagram Column Component';

  constructor(props) {
    super(props);
    this.state = {
      images: props.images
    };
  }

  getColumnClass() {
    return 'instagram-column';
  }

  renderCards() {
    let imageCards = [<h1 key={0} className="column-title">Instagram</h1>];
    this.state.images.forEach((image) => {
      imageCards.push(<InstagramCardComponent link={image.link}
        url={image.url} key={this.state.images.indexOf(image)+1}/>);
    });
    return imageCards;
  }

  renderColumnHeader() {
    return;
  }
}
