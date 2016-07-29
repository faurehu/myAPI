/* eslint-disable react/no-did-mount-set-state */
import React from 'react';

import ColumnComponent from './Columns/ColumnComponent';
import BlogColumnComponent from './Columns/BlogColumnComponent';
import ImagesColumnComponent from './Columns/ImagesColumnComponent';
import InstagramColumnComponent from './Columns/InstagramColumnComponent';
import GithubColumnComponent from './Columns/GithubColumnComponent';
import PocketColumnComponent from './Columns/PocketColumnComponent';
import TwitterColumnComponent from './Columns/TwitterColumnComponent';
import SoundCloudColumnComponent from './Columns/SoundCloudColumnComponent';
import YoutubeColumnComponent from './Columns/YoutubeColumnComponent';

class GridComponent extends React.Component {


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
    let { blog, github, instagram, photography, pocket, soundcloud,
      twitter, youtube } = this.props;
    return [
      <td key={0}><BlogColumnComponent posts={blog}/></td>,
      <td key={1} className="desktop"><TwitterColumnComponent tweets={twitter}/></td>,
      <td key={2} className="desktop"><ImagesColumnComponent images={photography}/></td>,
      <td key={3} className="desktop"><PocketColumnComponent articles={pocket}/></td>,
      <td key={4} className="desktop"><InstagramColumnComponent images={instagram}/></td>,
      <td key={5} className="desktop"><GithubColumnComponent repos={github}/></td>,
      <td key={6} className="desktop"><SoundCloudColumnComponent tracks={soundcloud}/></td>,
      <td key={7} className="desktop"><YoutubeColumnComponent videos={youtube}/></td>
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
                <a href="http://about.faure.hu" id="link" className="link link--mallki"
                  dangerouslySetInnerHTML={{__html:innerHtml}}/>
            </div>
            <div className="header-image">
              <a href="http://about.faure.hu"><img src="http://dc1v8vgdj2hdz.cloudfront.net/profile.jpg"/></a>
            </div>
            <div className="subs">
              <h1>Software Engineer</h1>
            </div>
            { !this.state.firefox ?
              <div className="toggler-container">
                <a onClick={this.toggleCollapse.bind(this)}
                   className="toggle-button">
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
                <a href="http://uk.linkedin.com/in/faurehu"><i className="fa fa-linkedin-square fa-3x"/></a>
                <a href="mailto:hi@faure.hu"><i className="fa fa-envelope-square fa-3x"/></a>
            </div>
        </div>
        {!this.state.firefox &&
          <div className={contentClass}>
            <table>
              <tbody>
                <tr>
                  {this.renderColumns()}
                </tr>
              </tbody>
            </table>
          </div>
        }
      </div>
    );
  }

  toggleCollapse() {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
}

GridComponent.displayName = 'Grid Component';
GridComponent.propTypes = {
  blog: React.PropTypes.array,
  twitter: React.PropTypes.array,
  photography: React.PropTypes.array,
  pocket: React.PropTypes.array,
  instagram: React.PropTypes.array,
  github: React.PropTypes.array,
  soundcloud: React.PropTypes.array,
  youtube: React.PropTypes.array
};
GridComponent.defaultProps = {}

export default GridComponent;
