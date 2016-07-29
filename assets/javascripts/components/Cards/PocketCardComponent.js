import React from 'react';

class PocketCardComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="card pocket-card" onClick={this.redirect.bind(this)}>
        <div className="card-header">
          <h1>{this.props.title}</h1>
        </div>
        <div className="card-bottom">
          <p>{this.props.excerpt}</p>
        </div>
      </div>
    );
  }

  redirect() {
    window.location = this.props.url;
  }
}

PocketCardComponent.displayName = 'Pocket Card Component';
PocketCardComponent.propTypes = {
  title: React.PropTypes.string,
  excerpt: React.PropTypes.string,
  url: React.PropTypes.string
};

PocketCardComponent.defaultProps = {}


export default PocketCardComponent
