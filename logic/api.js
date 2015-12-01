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
      let handleError = (err) => { res.status(500); return next(err); };
      let response = (data) => {
        let options = {
          url: `https://api.github.com/user/repos?access_token=${data.dataValues.token}&visibility=public&affiliation=owner,collaborator&sort=updated`,
          headers: {
            'User-Agent': 'faurehu'
          }
        }
        request(options, (err, response, body) => {
          if(err) handleError(err);
          let repos = JSON.parse(body);
          res.json(repos.map((repo) => {
            return {
              name: repo.name,
              description: repo.description,
              language: repo.language,
              url: repo.html_url
            }
          }));
        });
      }
      app.get('models').AccessToken.find({where: {service: 'github'}})
      .then(response).catch(handleError);
    },
    getPocket: (req, res, next) => {

      let handleError = (err) => { res.status(500); return next(err); };

      let response = (data) => {

        let options = {
          url: `https://getpocket.com/v3/get`,
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'X-Accept': 'application/json'
          },
          form: {
            'consumer_key': keys.pocket.consumerKey,
            'access_token': data.dataValues.token,
            'favorite': 1,
            'sort': 'newest',
            'detailType': 'simple',
            'count': 20,
            'offset': req.params.page*20
          }
        }

        request.post(options, (err, httpResponse, body) => {
          if(err) {handleError(err)};
          let articles = [];
          let parsedBody = JSON.parse(body).list;
          for(var article in parsedBody) {
            articles.push(parsedBody[article]);
          }
          articles.reverse();
          res.json(articles.map((article) => {
            return {
              title: article.resolved_title,
              excerpt: article.excerpt,
              url: article.given_url
            }
          }));
        });
      }

      app.get('models').AccessToken.find({where: {service: 'pocket'}})
      .then(response).catch(handleError);
    },
    getSoundcloud: (req, res, next) => {

      let handleError = (err) => { res.status(500); return next(err); };

      request.get(`http://api.soundcloud.com/users/22982175/favorites?client_id=${keys.soundcloud.clientID}`
      , (err, response, body) => {
        if(err) handleError(err);
        res.json(JSON.parse(body).map((node) => {
          return {
            title: node.title,
            user: node.user.username,
            media: node.artwork_url,
            url: node.permalink_url,
            id: node.id
          }
        }));
      });
    },
    getInstagram: (req, res, next) => {

      let handleError = (err) => { res.status(500); return next(err); };

      let response = (data) => {
        request.get(`https://api.instagram.com/v1/users/${data.dataValues.userID}/media/recent/?access_token=${data.dataValues.token}&count=50`,
        (err, response, body) => {
          if (err) handleError(err);
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
      .then(response).catch(handleError);
    },
    getYoutube: (req, res) => {

      let handleError = (err) => { res.status(500); return next(err); };

      request.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLKuiYq4-bq_xbGq09B8u76cJCfek0bm9N&key=${keys.google.key}&maxResults=50`,
      (err, response, body) => {
        if(err) handleError(err);
        let responseArray = JSON.parse(body).items;
        responseArray.reverse();
        res.json(responseArray.map((node) => {
          return {
            title: node.snippet.title,
            id: node.snippet.resourceId.videoId,
            media: node.snippet.thumbnails.medium.url
          }
        }));
      });
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
