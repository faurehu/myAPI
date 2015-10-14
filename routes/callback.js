import express from 'express';
let router = express.Router();
import callback from '../logic/callback';
import { apiRoute } from '../config/routes';

module.exports = (app) => {
  let callbackLogic = callback(app);
  router.get(apiRoute.instagram, callbackLogic.loginInstagram);
  router.get(apiRoute.github, callbackLogic.loginGithub);
  router.get(apiRoute.pocketCallback, callbackLogic.loginPocket);
  return router;
}
