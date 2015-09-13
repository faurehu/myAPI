import express from 'express';
import routes from '../config/routes'
let router = express.Router();

module.exports = (app) => {
  router.get(routes.blog, () => {});
  router.get(routes.post, () => {});
  return router;
}
