import ColumnComponent from './ColumnComponent';

export default class BlogColumnComponent extends ColumnComponent {
  static displayName = 'Blog Column Component';

  constructor(props) {
    super(props);
  }

  getColumnClass() {
    return 'blog-column';
  }

  renderColumnHeader() {
    return null;
  }
}
