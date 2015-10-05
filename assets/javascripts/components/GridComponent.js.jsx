import React from 'react/addons';
import ColumnComponent from './Columns/ColumnComponent';
import MobileColumnComponent from './Columns/MobileColumnComponent';
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
    let columns = [];
    [1, 2, 3, 4, 5, 6, 7, 8].forEach((data) => {
      columns.push(<td key={data}><ColumnComponent data={data}/></td>);
    });
    return columns;
  }

  render() {
    let innerHtml = `FaureHu<span data-letters="胡兆华"></span><span data-letters="胡兆华"></span>`
    return (
      <div className="grid-container">
        <div className="grid-sidebar">
            <a id="link" className="link link--mallki"
              dangerouslySetInnerHTML={{__html:innerHtml}}/>
        </div>
        <MobileColumnComponent/>
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
