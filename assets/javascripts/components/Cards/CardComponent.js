import React from 'react';

class CardComponent extends React.Component {
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

CardComponent.displayName = 'Card Component';
CardComponent.propTypes = {
  num: React.PropTypes.number
};
CardComponent.defaultProps = {}

export default CardComponent
