import express from 'express';
import routes from '../config/routes';
import blog from '../logic/blog';
let router = express.Router();

module.exports = (app) => {
  let blogLogic = blog(app);
  router.get(routes.blog, blogLogic.getBlog);
  router.get(routes.post, blogLogic.getPost);
  return router;
}
