import { keys } from '../config/prodConfig';
import request from 'request';
import https from 'https';

module.exports = (app) => {
  return {
    getBlog: (req, res, next) => {

      let handleError = (err) => { res.status(500); return next(err); };

      let response = (data) => {
        res.json(data.map((node) => {
          return node.dataValues;
        }));
      }

      app.get('models').post.findAll({order: '"createdAt" DESC'})
      .then(response).catch(handleError);
    },
    getImages: (req, res, next) => {

      let handleError = (err) => { res.status(500); return next(err); };

      let response = (data) => {
        res.json(data.map((node) => {
          return node.dataValues;
        }));
      }

      app.get('models').Image.findAll()
      .then(response).catch(handleError);
    },
    getTwitter: (req, res, next) => {

      let handleError = (err) => { res.status(500); return next(err); };

      var options = { hostname: 'api.twitter.com',
                      path: 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=faurehu&count=50&include_rts=true',
                      headers: {Authorization: 'Bearer ' + global.twitterToken}
                    }

      https.get(options, (result) => {
        var buffer = '';
        result.setEncoding('utf8');
        result.on('data', (data) => {
          buffer += data;
        });
        result.on('end', () => {
          var response = JSON.parse(buffer);
          res.json(response.map((tweet) => {
            return {
              myText: tweet.text,
              imgUrl: tweet.entities.media && tweet.entities.media[0].media_url,
              author: tweet.retweeted_status && tweet.retweeted_status.user.screen_name,
              text: tweet.retweeted_status && tweet.retweeted_status.text
            }
          }));
        });
      }).on('error', handleError);
    },
    getGithub: (req, res, next) => {

      let handleError = (err) => { console.log('at error:', err); res.status(500); return next(err); };

      let response = (data) => {
        console.log('at response:', data);
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
      console.log('at getGitub', app.get('models').AccessToken);
      app.get('models').AccessToken.findOrCreate({where: {service: 'github'}})
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
        console.log(data);
        request.get(`https://api.instagram.com/v1/users/6669726/media/recent/?access_token=${data.dataValues.token}&count=50`,
        (err, response, body) => {
          if (err) handleError(err);
          console.log(body);
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
        res.json(JSON.parse(body).items.map((node) => {
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
          console.log('Saved new token');
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
