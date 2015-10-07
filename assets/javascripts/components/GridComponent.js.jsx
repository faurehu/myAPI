import React from 'react/addons';
import ColumnComponent from './Columns/ColumnComponent';
import BlogColumnComponent from './Columns/BlogColumnComponent';
// TODO:
//M TwitterColumnComponent,
//H PocketColumnComponent,
//E PortfolioColumnComponent,
//M SoundcloudColumnComponent,
//M GithubColumnComponent,
//E MachineLearningColumnComponent,
//E RecommendedLinksColumnComponent,
//M InstagramColumnComponent,
//E RecommendedVideosColumnComponent

export default class GridComponent extends React.Component {
  static displayName = 'Grid Component';
  static propTypes = {};
  static defaultProps = {}

  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
  }

  renderColumns() {
    let columns = [
      <td key={0}><BlogColumnComponent/></td>
    ];
    for(var i = 1; i < 8; i++) {
      columns.push(<td key={i} className="desktop"><ColumnComponent/>)</td>);
    }
    return columns;
  }


  render() {
    let innerHtml = `FaureHu<span data-letters="胡兆华"></span><span data-letters="胡兆华"></span>`

    let sidebarClass = 'grid-sidebar';
    let contentClass = 'grid-content';
    if(this.state.collapsed) {
      sidebarClass += ' collapsed-sidebar';
      contentClass += ' collapsed-content';
    }

    return (
      <div className="grid-container">
        <div className={sidebarClass}>
            <div className="link-limiter">
                <a id="link" className="link link--mallki"
                  dangerouslySetInnerHTML={{__html:innerHtml}}/>
            </div>
            <div className="subs">
              <h1>Computer Science with Management U.G. @ KCL</h1>
            </div>
            <div className="toggler-container">
              <a onClick={this.toggleCollapse} className="toggle-button">
                <i className="fa fa-chevron-left fa-2x"/>
              </a>
            </div>
            <div className="contact-links">
                <a href="http://twitter.com/faurehu"><i className="fa fa-twitter-square fa-3x"/></a>
                <a href="http://github.com/faurehu"><i className="fa fa-github-square fa-3x"/></a>
                <a href="http://pe.linkedin.com/in/faurehu"><i className="fa fa-linkedin-square fa-3x"/></a>
                <a href="mailto:faurehu@gmail.com"><i className="fa fa-envelope-square fa-3x"/></a>
            </div>
        </div>
        <div className={contentClass}>
          <table>
            <tr>
              {this.renderColumns()}
            </tr>
          </table>
        </div>
      </div>
    );
  }

  toggleCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
}
