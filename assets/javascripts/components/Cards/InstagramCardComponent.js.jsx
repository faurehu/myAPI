import React from 'react/addons';

export default class InstagramCardComponent extends React.Component {
  static displayName = 'Instagram Card Component';
  static propTypes = {
    link: React.PropTypes.string,
    url: React.PropTypes.string
  };

  static defaultProps = {}

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <img className="card instagram-card" src={this.props.url} onClick={this.redirect}/>
    );
  }

  redirect = () => {
    window.location = this.props.link;
  }
}
