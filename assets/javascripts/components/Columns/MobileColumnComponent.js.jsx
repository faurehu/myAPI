import ColumnComponent from './ColumnComponent';

export default class MobileColumnComponent extends ColumnComponent {
  static displayName = 'Mobile Column Component';

  constructor(props) {
    super(props);
  }

  getColumnClass() {
    return 'mobile-column';
  }

  renderColumnHeader() {
    return null;
  }
}
