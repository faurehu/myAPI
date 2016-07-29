import React from 'react';
import CardComponent from '../Cards/CardComponent';

class ColumnComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  getColumnClass() {
    return '';
  }

  renderCards() {
    let cards = [];
    [1, 2, 3, 4, 5, 6, 7, 8].forEach((data) => {
      cards.push(<CardComponent num={data} key={data}/>);
    });
    return cards;
  }

  renderColumnHeader() {
    return (
      <div className="column-header">
        Title
      </div>
    );
  }

  render() {
    return (
      <div className={`column ${this.getColumnClass()}`}>
        {this.renderColumnHeader()}
        <div className="column-content">
          {this.renderCards()}
        </div>
      </div>
    );
  }
}

ColumnComponent.displayName = 'Column Component';

export default ColumnComponent
