module.exports = (app) => {
  app.get('/', (req, res) => {
    res.render('grid');
  });
  app.use('/blog', require('./blog')(app));
  app.use('/api', require('./api')(app));
}
