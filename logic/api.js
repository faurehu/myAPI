import { keys } from '../config/config';
import request from 'request';
import https from 'https';

let error = (err) => {console.log(err)};

let fixedEncodeURI = (str) => {
  return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']');
}

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
      });
    },
    getGithub: (req, res) => {

      let response = (data) => {

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
              language: repo.language,
              url: repo.html_url
            }
          }));
        });
      }

      app.get('models').AccessToken.find({where: {service: 'github'}})
      .then(response).catch(error);
    },
    getPocket: (req, res) => {

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
      .then(response).catch(error);
    },
    getSoundcloud: (req, res) => {
      request.get(`http://api.soundcloud.com/users/22982175/favorites?client_id=${keys.soundcloud.clientID}`
      , (err, response, body) => {
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
    getYoutube: (req, res) => {
      request.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLKuiYq4-bq_xbGq09B8u76cJCfek0bm9N&key=${keys.google.key}&maxResults=50`,
      (err, response, body) => {
        if(err) {console.log(err);}
        res.json(JSON.parse(body).items.map((node) => {
          return {
            title: node.snippet.title,
            id: node.id,
            media: node.snippet.thumbnails.medium.url
          }
        }));
      });
    },
    pocketLogin: (req, res) => {
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
        res.json({
          status: 'FAIL'
        })
      }
    }
  }
}
