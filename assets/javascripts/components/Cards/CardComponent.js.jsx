import React from 'react/addons';

export default class CardComponent extends React.Component {
  static displayName = 'Card Component';
  static propTypes = {
    num: React.PropTypes.number
  };
  static defaultProps = {}

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="card">
        <span>{this.props.num}</span>
        <p>Content</p>
      </div>
    );
  }
}
