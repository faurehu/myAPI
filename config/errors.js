module.exports = (app) => {
  app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    res.render('404');
  });

  if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('500');
  });
}
