import React from 'react/addons';

export default class ImageCardComponent extends React.Component {
  static displayName = 'Image Card Component';
  static propTypes = {
    caption: React.PropTypes.string,
    url: React.PropTypes.string,
    id: React.PropTypes.number,
    index: React.PropTypes.number,
    ps: React.PropTypes.func
  };

  static defaultProps = {}

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="card image-card" onClick={this.props.ps.bind(null, this.props.index)}>
        <img src={this.props.url} alt={this.props.caption}/>
        <h1>{this.props.caption}</h1>
      </div>
    );
  }
}
