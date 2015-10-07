import React from 'react/addons';

export default class ImageCardComponent extends React.Component {
  static displayName = 'Image Card Component';
  static propTypes = {
    caption: React.PropTypes.string,
    url: React.PropTypes.string,
    id: React.PropTypes.number
  };

  static defaultProps = {}

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="card image-card">
        <img src={this.props.url}/>
        <h1>{this.props.caption}</h1>
      </div>
    );
  }
}
