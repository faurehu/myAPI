import { keys } from '../config/config';
import request from 'request';

let error = (err) => {console.log(err)};

module.exports = (app) => {
  return {
    getBlog: (req, res) => {

      let response = (data) => {
        res.json(data.map((node) => {
          return node.dataValues;
        }));
      }

      app.get('models').Post.findAll()
      .then(response).catch((err) => { console.log(err); });
    },
    getImages: (req, res) => {

      let response = (data) => {
        res.json(data.map((node) => {
          return node.dataValues;
        }));
      }

      app.get('models').Image.findAll()
      .then(response).catch((err) => { console.log(err); });
    },
    getTwitter: (req, res) => {
      let oauth2 = new OAuth2(
        keys.twitter.consumerKey,
        keys.twitter.consumerSecret,
        'https://api.twitter.com/', null, 'oauth2/token', null);
    },
    getGithub: (req, res) => {

      let response = (data) => {

        console.log(data.dataValues.token)

        let options = {
          url: `https://api.github.com/user/repos?access_token=${data.dataValues.token}&visibility=public&affiliation=owner,collaborator&sort=updated`,
          headers: {
            'User-Agent': 'faurehu'
          }
        }
        request(options, (err, response, body) => {
          if (err) { console.log(err); };
          let repos = JSON.parse(body);
          res.json(repos.map((repo) => {
            return {
              name: repo.name,
              description: repo.description,
              languager: repo.language,
              url: repo.html_url
            }
          }));
        });
      }

      app.get('models').AccessToken.find({where: {service: 'github'}})
      .then(response).catch(error);
    },
    getPocket: (req, res) => {

    },
    getSoundcloud: (req, res) => {

    },
    getInstagram: (req, res) => {
      let response = (data) => {
        request.get(`https://api.instagram.com/v1/users/${data.dataValues.userID}/media/recent/?access_token=${data.dataValues.token}&count=50`,
        (err, response, body) => {
          if (err) res.json({});
          let photos = JSON.parse(body).data;
          res.json(photos.map((photo) => {
            return {
              link: photo.link,
              url: photo.images.standard_resolution.url
            }
          }));
        }
      );
      }

      app.get('models').AccessToken.find({where: {service: 'instagram'}})
      .then(response).catch(error);
    },
    getVideos: (req, res) => {

    },
    getLinks: (req, res) => {

    }
  }
}
