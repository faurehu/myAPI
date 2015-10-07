import express from 'express';
import { apiRoute } from '../config/routes';
import api from '../logic/api';
let router = express.Router();

module.exports = (app) => {
  let apiLogic = api(app);
  router.get(apiRoute.blog, apiLogic.getBlog);
  router.get(apiRoute.twitter, () => {});
  router.get(apiRoute.youtube, () => {});
  router.get(apiRoute.github, () => {});
  router.get(apiRoute.pocket, () => {});
  router.get(apiRoute.soundcloud, () => {});
  router.get(apiRoute.photo, apiLogic.getImages);
  router.get(apiRoute.instagram, () => {});
  router.get(apiRoute.links, () => {});
  return router;
}
