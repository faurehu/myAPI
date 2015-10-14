import request from 'request';
import { keys } from '../config/config';

module.exports = (app) => {
  return {
    loginInstagram: (req, res, next) => {

      let handleError = (err) => { res.status(500); return next(err); }

      let options = {
        client_id: process.env.INSTAGRAM_ID || keys.instagram.clientID,
        client_secret: process.env.INSTAGRAM_SECRET || keys.instagram.clientSecret,
        grant_type: 'authorization_code',
        redirect_uri: 'http://faure.hu/callback/instagram',
        code: req.query.code
      };

      request.post('https://api.instagram.com/oauth/access_token', {form: options}, (err, httpResponse, body) => {

        let saveToken = (data, created) => {
          app.get('models').AccessToken.findById(data[0].dataValues.id).then((token) => {
            let info = JSON.parse(body);
            token.update({token: info.access_token, userID: info.user.id});
            console.log('Saved new token');
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
        client_id: process.env.GITHUB_ID || keys.github.clientID,
        client_secret: process.env.GITHUB_SECRET || keys.github.clientSecret,
        grant_type: 'authorization_code',
        redirect_uri: 'http://faure.hu/callback/github',
        code: req.query.code
      }

      request.post('https://github.com/login/oauth/access_token', {form: options}, (err, httpResponse, body) => {
        let saveToken = (data, created) => {
          app.get('models').AccessToken.findById(data[0].dataValues.id).then((token) => {
            token.update({token: body.substring(13, body.indexOf('&'))});
            console.log('Saved new token');
          });
          res.json({
            status: 'SUCCESS'
          });
        }

        if (err) { handleError(err); }
        app.get('models').AccessToken.findOrCreate({where: {service: 'github'}}).then(saveToken).catch(handleError);
      });
    },
    loginPocket: (req, res, next) => {
      res.json({
        status: 'SUCCESS'
      });
    }
  }
}
