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
    this.state = {};
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
    return (
      <div className="grid-container">
        <div className="grid-sidebar">
            <div className="link-limiter">
                <a id="link" className="link link--mallki"
                  dangerouslySetInnerHTML={{__html:innerHtml}}/>
            </div>
            <div className="subs">
              <h1>Computer Science with Management U.G. @ KCL</h1>
            </div>
            <div className="contact-links">
                <a href="twitter.com/faurehu"><i className="fa fa-twitter-square fa-3x"/></a>
                <a href="github.com/faurehu"><i className="fa fa-github-square fa-3x"/></a>
                <a href="http://pe.linkedin.com/in/faurehu"><i className="fa fa-linkedin-square fa-3x"/></a>
                <a href="mailto:faurehu@gmail.com"><i className="fa fa-envelope-square fa-3x"/></a>
            </div>
        </div>
        <div className="grid-content">
          <table>
            <tr>
              {this.renderColumns()}
            </tr>
          </table>
        </div>
      </div>
    );
  }
}
