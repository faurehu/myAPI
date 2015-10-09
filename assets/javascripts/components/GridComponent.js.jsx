import React from 'react/addons';

import ColumnComponent from './Columns/ColumnComponent';
import BlogColumnComponent from './Columns/BlogColumnComponent';
import ImagesColumnComponent from './Columns/ImagesColumnComponent';
import InstagramColumnComponent from './Columns/InstagramColumnComponent';
import GithubColumnComponent from './Columns/GithubColumnComponent';
import PocketColumnComponent from './Columns/PocketColumnComponent';
import TwitterColumnComponent from './Columns/TwitterColumnComponent';
import SoundCloudColumnComponent from './Columns/SoundCloudColumnComponent';
import YoutubeColumnComponent from './Columns/YoutubeColumnComponent';

export default class GridComponent extends React.Component {
  static displayName = 'Grid Component';
  static propTypes = {};
  static defaultProps = {}

  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      firefox: false
    };
  }

  componentDidMount() {
    if(navigator.userAgent.indexOf('Firefox') > -1) {
      this.setState({
        firefox: true
      });
    }
  }

  renderColumns() {
    return [
      <td key={0}><BlogColumnComponent/></td>,
      <td key={1} className="desktop"><TwitterColumnComponent/></td>,
      <td key={2} className="desktop"><ImagesColumnComponent/></td>,
      <td key={3} className="desktop"><PocketColumnComponent/></td>,
      <td key={4} className="desktop"><InstagramColumnComponent/></td>,
      <td key={5} className="desktop"><GithubColumnComponent/></td>,
      <td key={6} className="desktop"><SoundCloudColumnComponent/></td>,
      <td key={7} className="desktop"><YoutubeColumnComponent/></td>
    ];
  }


  render() {
    let innerHtml = `FaureHu<span data-letters="胡兆华"></span><span data-letters="胡兆华"></span>`

    let sidebarClass = 'grid-sidebar';
    let contentClass = 'grid-content';
    if(this.state.collapsed) {
      sidebarClass += ' collapsed-sidebar';
      contentClass += ' collapsed-content';
    }
    if(this.state.firefox) {
      sidebarClass += ' firefox-sidebar';
    }

    return (
      <div className="grid-container">
        <div className={sidebarClass}>
            <div className="link-limiter">
                <a id="link" className="link link--mallki"
                  dangerouslySetInnerHTML={{__html:innerHtml}}/>
            </div>
            <div className="header-image">
              <img src="./assets/picture.png"/>
            </div>
            <div className="subs">
              <h1>Computer Science with Management U.G. @ KCL</h1>
            </div>
            { !this.state.firefox ?
              <div className="toggler-container">
                <a onClick={this.toggleCollapse} className="toggle-button">
                  <i className="fa fa-chevron-left fa-2x"/>
                </a>
              </div>
              :
              <div className="firefox-message">
                Firefox currently not supported
              </div>
            }
            <div className="contact-links">
                <a href="http://twitter.com/faurehu"><i className="fa fa-twitter-square fa-3x"/></a>
                <a href="http://github.com/faurehu"><i className="fa fa-github-square fa-3x"/></a>
                <a href="http://pe.linkedin.com/in/faurehu"><i className="fa fa-linkedin-square fa-3x"/></a>
                <a href="mailto:faurehu@gmail.com"><i className="fa fa-envelope-square fa-3x"/></a>
            </div>
        </div>
        {!this.state.firefox &&
          <div className={contentClass}>
            <table>
              <tr>
                {this.renderColumns()}
              </tr>
            </table>
          </div>
        }
      </div>
    );
  }

  toggleCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
}
