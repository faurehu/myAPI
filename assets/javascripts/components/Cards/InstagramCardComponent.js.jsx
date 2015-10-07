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
      <div className="card instagram-card" onClick={this.redirect}>
        <img src={this.props.url}/>
      </div>
    );
  }

  redirect = () => {
    window.location = this.props.link;
  }
}
