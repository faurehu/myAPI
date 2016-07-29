import React from 'react';

class InstagramCardComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <img alt="Instragram picture" className="card instagram-card"
            src={this.props.url} onClick={this.redirect.bind(this)}/>
    );
  }

  redirect() {
    window.location = this.props.link;
  }
}

InstagramCardComponent.displayName = 'Instagram Card Component';
InstagramCardComponent.propTypes = {
  link: React.PropTypes.string,
  url: React.PropTypes.string
};

InstagramCardComponent.defaultProps = {}

export default InstagramCardComponent
