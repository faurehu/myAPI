import express from 'express';
let router = express.Router();

module.exports = (app) => {
  router.get(routes.blog, () => {});
  router.get(routes.post, () => {});
  return router;
}
