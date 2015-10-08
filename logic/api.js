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

      https.get(options, function(result) {
        var buffer = '';
        result.setEncoding('utf8');
        result.on('data', function(data) {
          buffer += data;
        });
        result.on('end', function() {
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
