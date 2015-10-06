import React from 'react/addons';
import ColumnComponent from './Columns/ColumnComponent';
import BlogColumnComponent from './Columns/BlogColumnComponent';
// TODO:
// TwitterColumnComponent,
// PocketColumnComponent,
// PortfolioColumnComponent,
// SoundcloudColumnComponent,
// BlogColumnComponent,
// GithubColumnComponent,
// LinksColumnComponent,
// InstagramColumnComponent,
// YoutubeColumnComponent,
// StorehouseColumnComponent

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
      <BlogColumnComponent key={0}/>
    ];
    for(var i = 1; i < 8; i++) {
      columns.push(<ColumnComponent key={i}/>);
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
            <div className="contact-links">
                <a href="twitter.com/faurehu"><i className="fa fa-twitter-square fa-3x"/></a>
                <a href="github.com/faurehu"><i className="fa fa-github-square fa-3x"/></a>
                <a href="http://pe.linkedin.com/in/faurehu"><i className="fa fa-linkedin-square fa-3x"/></a>
                <a href="mailto:faurehu@gmail.com"><i className="fa fa-envelope-square fa-3x"/></a>
            </div>
        </div>
        <div className="grid-content">
          <div className="trow">
            {this.renderColumns()}
          </div>
        </div>
      </div>
    );
  }
}
