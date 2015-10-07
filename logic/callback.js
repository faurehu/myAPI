import request from 'request';
import { keys } from '../config/config';

let error = (err) => { console.log(err); };

module.exports = (app) => {
  return {
    loginInstagram: (req, res) => {

      let options = {
        client_id: keys.instagram.clientID,
        client_secret: keys.instagram.clientSecret,
        grant_type: 'authorization_code',
        redirect_uri: 'http://localhost:3000/callback/instagram',
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

        if (err) { console.log(err); }
        app.get('models').AccessToken.findOrCreate({where: {service: 'instagram'}}).then(saveToken).catch(error);
      });
    }
  }
}
