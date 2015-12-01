import https from 'https';
import request from 'request';

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

let callAPIs = (res, app) => new Promise((resolve, reject) => {
  let promises = [twitterAPI(), blogAPI(), photoAPI(), githubAPI()];
  Promise.all(promises).then(resolve).catch(reject);
});

let memoCheck = (key, res) => {
  let handleError = (err) => { res.status(500); console.log(err); return next(err); };
  let success = () => { timeCheck = Date.now(); res.json(store[key]); };
  if (Date.now() > timeCheck + ( 10 * 60 * 1000 )) {
    callAPIs(res, app).then(success).catch(handleError);
  } else { success(); }
}

export function memoMaker(_app) {
  app = _app;
  return memoCheck;
}
