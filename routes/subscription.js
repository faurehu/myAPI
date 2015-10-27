import express from 'express';
let router = express.Router();
import subscription from '../logic/subscription';
import { apiRoute } from '../config/routes';

module.exports = (app) => {
  let subscriptionLogic = subscription(app);
  router.get('/', subscriptionLogic.confirm);
  router.post('/', subscriptionLogic.subscribe);
  return router;
}
