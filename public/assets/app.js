var isMobile = function() {
  var width;

  if (self.innerHeight) {
    width = self.innerWidth;
  }

  if (document.documentElement && document.documentElement.clientHeight) {
    width = document.documentElement.clientWidth;
  }

  if (document.body) {
    width = document.body.clientWidth;
  }

  return width < 800;
}

React.render(React.createElement(GridComponent, {}), document.getElementById('container'));
