import request from 'request';


export default function twitter() {
  return new Promise((resolve, reject) => {
    let options = {
      url: 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=faurehu&count=20&include_rts=true',
      headers: {
        Authorization: 'Bearer ' + global.twitterToken
      }
    }
    request(options, (err, response, body) => {
      if(err) reject(err);
      let data = JSON.parse(body);
      resolve(data.map(tweet => {
        return {
          text: tweet.text,
          img: tweet.entities.media && tweet.entities.media[0].media_url,
          rt: tweet.retweeted_status && {
            author: tweet.retweeted_status.user.screen_name,
            text: tweet.retweeted_status.test
          }
        }
      }));
    });
  });
}
