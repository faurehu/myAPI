/*eslint camelcase: 0*/

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
    this.reload();
  }

  getColumnClass() {
    return 'images-column';
  }

  renderCards() {
    let imageCards = [<h1 key={0} className="column-title">Photography</h1>];
    if(this.state.empty) {
      imageCards.push(<div className="reload-div"><h2>There has been a disconnection</h2><h2 className="reload-click" onClick={this.reload}>Try again?</h2></div>);
    } else if (this.state.images !== undefined) {
      this.state.images.forEach((image) => {
        let index =this.state.images.indexOf(image);
        imageCards.push(<ImageCardComponent caption={image.caption} id={image.id}
          url={image.medium} key={index+1} index={index} ps={this.photoSwipe}/>);
      });
    }
    return imageCards;
  }

  renderColumnHeader() {
    return;
  }

  photoSwipe = (index) => {

    let pswpElement = document.querySelectorAll('.pswp')[0];

    let items = this.state.images.map((image) => {
      return {
        src: image.large,
        w: image.width,
        h: image.height,
        msrc: image.small,
        title: image.caption
      }
    });

    let options = {
      index:index,
      barsSize: {top:44, bottom:'auto'},
      timeToIdle: 4000,
      timeToIdleOutside: 1000,
      loadingIndicatorDelay: 1000,
      addCaptionHTMLFn: function(item, captionEl, isFake) {
        if(!item.title) {
          captionEl.children[0].innerHTML = '';
          return false;
        }
        captionEl.children[0].innerHTML = item.title;
        return true;
      },
      loop:true,
      closeEl:true,
      captionEl: true,
      fullscreenEl: true,
      zoomEl: true,
      shareEl: true,
      counterEl: true,
      arrowEl: true,
      preloaderEl: true,
      tapToClose: false,
      tapToToggleControls: true,
      clickToCloseNonZoomable: true,
      closeElClasses: ['item', 'caption', 'zoom-wrap', 'ui', 'top-bar'],
      indexIndicatorSep: ' / ',
    };

    let gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
  }

  reload = () => {
    XHR.send({
      method: 'GET',
      url: `${window.location.origin}/api/photo`
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
      });
    });
  }
}
