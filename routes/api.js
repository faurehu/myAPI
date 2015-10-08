import express from 'express';
import { apiRoute } from '../config/routes';
import api from '../logic/api';
let router = express.Router();

module.exports = (app) => {
  let apiLogic = api(app);
  router.get(apiRoute.blog, apiLogic.getBlog);
  router.get(apiRoute.twitter, apiLogic.getTwitter);
  router.get(apiRoute.videos, () => {});
  router.get(apiRoute.github, apiLogic.getGithub);
  router.get(apiRoute.pocket, apiLogic.getPocket);
  router.post(apiRoute.pocket, apiLogic.pocketLogin);
  router.get(apiRoute.soundcloud, apiLogic.getSoundcloud);
  router.get(apiRoute.photo, apiLogic.getImages);
  router.get(apiRoute.instagram, apiLogic.getInstagram);
  router.get(apiRoute.links, () => {});
  return router;
}
