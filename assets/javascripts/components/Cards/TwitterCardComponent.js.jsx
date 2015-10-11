import React from 'react/addons';

export default class TwitterCardComponent extends React.Component {
  static displayName = 'Twitter Card Component';
  static propTypes = {
    text: React.PropTypes.string,
    author: React.PropTypes.string,
    media: React.PropTypes.string
  };

  static defaultProps = {}

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="card twitter-card">
        {(this.props.media !== undefined || this.props.author !== undefined) &&
          <div className="card-header">
            {this.props.media &&
              <img src={this.props.media}/>
            }
            {this.props.author &&
              <span onClick={this.redirect}
                className={this.props.media !== undefined ? 'gradient-image' : ''}>
                {`RT @${this.props.author}`}
              </span>
            }
          </div>
        }
        <div className="card-bottom">
          <p>{this.props.text}</p>
        </div>
      </div>
    );
  }

  redirect = () => {
    window.location = `http://www.twitter.com/${this.props.author}`;
  }
}
