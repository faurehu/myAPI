import config from '../config/config';
import request from 'request';
import https from 'https';
import { memoMaker } from './apiCaller';
let keys = config().keys;

module.exports = (app) => {
  let memoCheck = memoMaker(app);
  return {
    getBlog: (req, res, next) => {
      memoCheck("posts", res);
    },
    getImages: (req, res, next) => {
      memoCheck("photos", res);
    },
    getTwitter: (req, res, next) => {
      memoCheck("tweets", res);
    },
    getGithub: (req, res, next) => {
      memoCheck("repos", res);
    },
    getPocket: (req, res, next) => {
      memoCheck("articles", res);
    },
    getSoundcloud: (req, res, next) => {
      memoCheck("tracks", res);
    },
    getInstagram: (req, res, next) => {
      memoCheck("images", res);
    },
    getYoutube: (req, res) => {
      memoCheck("videos", res);
    },
    pocketLogin: (req, res, next) => {

      let handleError = (err) => { res.status(500); return next(err); };

      let saveToken = (data, created) => {
        app.get('models').AccessToken.findById(data[0].dataValues.id).then((token) => {
          token.update({token: req.query.token});
        });
        res.json({
          status: 'SUCCESS'
        });
      }

      if(req.query.secret === keys.pocket.myOwnSecret) {
        app.get('models').AccessToken.findOrCreate({where: {service: 'pocket'}}).then(saveToken).catch(error);
      } else {
        if(err) handleError(err);
      }
    }
  }
}
