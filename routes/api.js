import express from 'express';
import routes from '../config/routes';
import logic from '../logic/blog';
let router = express.Router();

module.exports = () => {
  router.get(routes.blog, blog.getBlog});
  router.get(routes.post, blog.getPost);
  return router;
}
