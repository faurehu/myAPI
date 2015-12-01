import request from 'request';
import config from '../config/config';
let keys = config().keys;

module.exports = (app) => {
  return {
    loginInstagram: (req, res, next) => {

      let handleError = (err) => { res.status(500); return next(err); }

      let options = {
        client_id: keys.instagram.clientID,
        client_secret: keys.instagram.clientSecret,
        grant_type: 'authorization_code',
        redirect_uri: 'http://faurehomepage.herokuapp.com/callback/instagram',
        code: req.query.code
      };

      request.post('https://api.instagram.com/oauth/access_token', {form: options}, (err, httpResponse, body) => {

        let saveToken = (data, created) => {
          app.get('models').AccessToken.findById(data[0].dataValues.id).then((token) => {
            let info = JSON.parse(body);
            token.update({token: info.access_token, userID: info.user.id});
          });
          res.json({
            status: 'SUCCESS'
          });
        }

        if (err) { handleError(err); }
        app.get('models').AccessToken.findOrCreate({where: {service: 'instagram'}}).then(saveToken).catch(handleError);
      });
    },
    loginGithub: (req, res, next) => {

      let handleError = (err) => { res.status(500); return next(err); }

      let options = {
        client_id: keys.github.clientID,
        client_secret: keys.github.clientSecret,
        grant_type: 'authorization_code',
        redirect_uri: 'http://faurehomepage.herokuapp.com/callback/github',
        code: req.query.code
      }

      request.post('https://github.com/login/oauth/access_token', {form: options}, (err, httpResponse, body) => {
        let saveToken = (data, created) => {
          app.get('models').AccessToken.findById(data[0].dataValues.id).then((token) => {
            token.update({token: body.substring(13, body.indexOf('&'))});
          });
          res.json({
            status: 'SUCCESS'
          });
        }

        if (err) { handleError(err); }
        app.get('models').AccessToken.findOrCreate({where: {service: 'github'}}).then(saveToken).catch(handleError);
      });
    },
    pocketCallback: (req, res, next) => {
      res.json({
        status: 'SUCCESS'
      });
    },
    pocketStore: (req, res, next) => {
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
