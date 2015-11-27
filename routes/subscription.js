import express from 'express';
let router = express.Router();
import subscription from '../logic/subscription';

module.exports = (app) => {
  let subscriptionLogic = subscription(app);
  router.get('/', subscriptionLogic.confirm);
  router.post('/', subscriptionLogic.subscribe);
  router.get('/cancel', subscriptionLogic.unsubscribe);
  return router;
}
