import request from 'request';
import config from '../../config/config';
let keys = config().keys;


export default function pocket() {
  return new Promise((resolve, reject) => {
    let options = {
      url: 'https://getpocket.com/v3/get',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'X-Accept': 'application/json'
      },
      form: {
        'consumer_key': keys.pocket.consumerKey,
        'access_token': keys.pocket.token,
        'favorite': 1,
        'sort': 'newest',
        'detailType': 'simple',
        'count': 20,
        'offset': 0
      }
    }
    request.post(options, (err, response, body) => {
      if(err) reject(err);
      let articles = [];
      let data = JSON.parse(body).list;
      for(var article in data) {
        articles.push(data[article]);
      }
      articles.reverse();
      resolve(articles.map(article => {
        return {
          title: article.resolved_title,
          excerpt: article.excerpt,
          url: article.given_url
        }
      }));
    });
  });
}
