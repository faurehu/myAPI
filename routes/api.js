import express from 'express';
import { api } from '../config/routes';
let router = express.Router();

module.exports = () => {
  router.get(api.twitter, () => {});
  router.get(api.youtube, () => {});
  router.get(api.github, () => {});
  router.get(api.pocket, () => {});
  router.get(api.soundcloud, () => {});
  router.get(api.photo, () => {});
  router.get(api.instagram, () => {});
  router.get(api.links, () => {});
  return router;
}
