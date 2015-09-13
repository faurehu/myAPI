module.exports = (app) => {
  app.use('/', require('./blog')(app));
}
