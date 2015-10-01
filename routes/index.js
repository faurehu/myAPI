module.exports = (app) => {
  app.use('/blog', require('./blog')(app));
  app.use('/api', require('./api')(app));
}
