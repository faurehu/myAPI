import config from '../config/config';
import https from 'https';
import request from 'request';
let keys = config().keys;

let store = {};
let timeCheck = 0;
let app;

let blogAPI = () => new Promise((resolve, reject) => {
  app.get('models').post.findAll({order: '"createdAt" DESC'})
  .then((data) => {
    store.posts = data.map((node) => {
      return node.dataValues;
    });
  })
  .then(resolve)
  .catch(reject);
});

let twitterAPI = () => new Promise((resolve, reject) => {
  var options = {
    hostname: 'api.twitter.com',
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
      store.tweets = response.map((tweet) => {
        return {
          myText: tweet.text,
          imgUrl: tweet.entities.media && tweet.entities.media[0].media_url,
          author: tweet.retweeted_status && tweet.retweeted_status.user.screen_name,
          text: tweet.retweeted_status && tweet.retweeted_status.text
        }
      });
      resolve();
    });
  }).on('error', reject);
});

let photoAPI = () => new Promise((resolve, reject) => {
  app.get('models').Image.findAll()
  .then((data) => {
    store.photos = data.map((node) => {
      return node.dataValues;
    });
  })
  .then(resolve)
  .catch(reject);
})

let githubAPI = () => new Promise((resolve, reject) => {
  let response = (data) => {
    let options = {
      url: `https://api.github.com/user/repos?access_token=${data.dataValues.token}&visibility=public&affiliation=owner,collaborator&sort=updated`,
      headers: {
        'User-Agent': 'faurehu'
      }
    }
    request(options, (err, response, body) => {
      if(err) reject(err);
      let repos = JSON.parse(body);
      store.repos = repos.map((repo) => {
        return {
          name: repo.name,
          description: repo.description,
          language: repo.language,
          url: repo.html_url
        }
      });
      resolve();
    });
  }
  app.get('models').AccessToken.find({where: {service: 'github'}})
  .then(response)
  .catch(reject);
});

let pocketAPI = () => new Promise((resolve, reject) => {
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
        'offset': 0
      }
    }
    request.post(options, (err, httpResponse, body) => {
      if(err) reject(err);
      let articles = [];
      let parsedBody = JSON.parse(body).list;
      for(var article in parsedBody) {
        articles.push(parsedBody[article]);
      }
      articles.reverse();
      store.articles = articles.map((article) => {
        return {
          title: article.resolved_title,
          excerpt: article.excerpt,
          url: article.given_url
        }
      });
      resolve();
    });
  }

  app.get('models').AccessToken.find({where: {service: 'pocket'}})
  .then(response)
  .catch(reject);
});

let soundCloudAPI = () => new Promise((resolve, reject) => {
  request.get(`http://api.soundcloud.com/users/22982175/favorites?client_id=${keys.soundcloud.clientID}`
  , (err, response, body) => {
    if(err) reject(err);
    store.tracks = JSON.parse(body).map((node) => {
      return {
        title: node.title,
        user: node.user.username,
        media: node.artwork_url,
        url: node.permalink_url,
        id: node.id
      }
    });
    resolve();
  });
});

let youtubeAPI = () => new Promise((resolve, reject) => {
  request.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLKuiYq4-bq_xbGq09B8u76cJCfek0bm9N&key=${keys.google.key}&maxResults=50`,
  (err, response, body) => {
    if(err) reject(err);
    let responseArray = JSON.parse(body).items;
    responseArray.reverse();
    store.videos = responseArray.filter((node) => {
    return node.snippet.title != 'Deleted video' })
      .map((node) => {
      return {
        title: node.snippet.title,
        id: node.snippet.resourceId.videoId,
        media: node.snippet.thumbnails.medium.url
      }
    });
    resolve();
  });
});

let instagramAPI = () => new Promise((resolve, reject) => {
  let response = (data) => {
    request.get(`https://api.instagram.com/v1/users/${data.dataValues.userID}/media/recent/?access_token=${data.dataValues.token}&count=50`,
    (err, response, body) => {
      if (err) reject(err);
      let photos = JSON.parse(body).data;
      store.images = photos.map((photo) => {
        return {
          link: photo.link,
          url: photo.images.standard_resolution.url
        }
      });
      resolve();
    }
  );
  }
  app.get('models').AccessToken.find({where: {service: 'instagram'}})
  .then(response)
  .catch(reject);
});

let callAPIs = () => new Promise((resolve, reject) => {
  let promises = [
    twitterAPI(),
    blogAPI(), photoAPI(), githubAPI(), pocketAPI(),
    soundCloudAPI(), instagramAPI(), youtubeAPI()];
  Promise.all(promises).then(resolve).catch(reject);
});

let memoCheck = (key, res) => {
  let handleError = (err) => { res.status(500); console.log(err); return next(err); };
  let success = () => { timeCheck = Date.now(); res.json(store[key]); };
  if (Date.now() > timeCheck + ( 10 * 60 * 1000 )) {
    callAPIs().then(success).catch(handleError);
  } else { success(); }
}

export function memoMaker(_app) {
  app = _app;
  return memoCheck;
}
