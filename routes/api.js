import express from 'express';
import { apiRoute } from '../config/routes';
import api from '../logic/api';
let router = express.Router();

module.exports = (app) => {
  let apiLogic = api(app);
  router.get(apiRoute.blog, apiLogic.getBlog);
  router.get(apiRoute.twitter, apiLogic.getTwitter);
  router.get(apiRoute.youtube, apiLogic.getYoutube);
  router.get(apiRoute.github, apiLogic.getGithub);
  router.get(apiRoute.pocket, apiLogic.getPocket);
  router.get(apiRoute.soundcloud, apiLogic.getSoundcloud);
  router.get(apiRoute.photo, apiLogic.getImages);
  router.get(apiRoute.instagram, apiLogic.getInstagram);
  return router;
}
