import fetchStore from '../logic/store'

module.exports = (app) => {
  app.get('/', (req, res) => {
    fetchStore().then(x => res.render('grid', { assets: x}));
  });
  app.use('/blog', require('./blog')(app));
  app.use('/api', require('./api')(app));
  app.use('/callback', require('./callback')(app));
  app.use('/subscribe', require('./subscription')(app));
}
