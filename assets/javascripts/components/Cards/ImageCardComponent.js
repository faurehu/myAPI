import React from 'react';

class ImageCardComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="card image-card" onClick={this.props.ps.bind(null, this.props.index)}>
        <img src={this.props.url} alt={this.props.caption}/>
      </div>
    );
  }
}

ImageCardComponent.displayName = 'Image Card Component';
ImageCardComponent.propTypes = {
  caption: React.PropTypes.string,
  url: React.PropTypes.string,
  id: React.PropTypes.number,
  index: React.PropTypes.number,
  ps: React.PropTypes.func
};

ImageCardComponent.defaultProps = {}

export default ImageCardComponent
