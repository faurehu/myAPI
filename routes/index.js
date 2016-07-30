import fetchStore from '../logic/store'
import { renderToString } from 'react-dom/server'
import GridComponent from '../assets/javascripts/components/GridComponent'
import CardComponent from '../assets/javascripts/components/Cards/CardComponent'
import React from 'react'

module.exports = (app) => {
  app.get('/', (req, res) => {
    fetchStore().then(x => {
      res.render('grid', {renderedHTML: x.renderedHTML, assets: x.assets});
    }).catch(err => console.log(err.stack));
  });
  app.use('/blog', require('./blog')(app));
  app.use('/api', require('./api')(app));
  app.use('/subscribe', require('./subscription')(app));
}
