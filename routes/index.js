module.exports = (app) => {
  app.use('/', require('./blog')(app));
  app.use('/api', require('./api')(app));
}
