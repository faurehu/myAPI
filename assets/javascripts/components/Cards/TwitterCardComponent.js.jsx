import React from 'react/addons';

export default class TwitterCardComponent extends React.Component {
  static displayName = 'Twitter Card Component';
  static propTypes = {
    text: React.PropTypes.string,
    rt: React.PropTypes.object,
    img: React.PropTypes.string
  };

  static defaultProps = {}

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="card twitter-card">
        {(this.props.img !== undefined || this.props.rt !== undefined) &&
          <div className="card-header">
            {this.props.img &&
              <img src={this.props.img}/>
            }
            {this.props.rt &&
              <span onClick={this.redirect}
                className={this.props.img !== undefined ? 'gradient-image' : ''}>
                {`RT @${this.props.rt.author}`}
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
    window.location = `http://www.twitter.com/${this.props.rt.author}`;
  }
}
