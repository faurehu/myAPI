import request from 'request';
import config from '../../config/config';
let keys = config().keys;


export default function instagram() {
  return new Promise((resolve, reject) => {
    let options = {
      url: `https://api.instagram.com/v1/users/${keys.instagram.userID}/media/recent/?access_token=${keys.instagram.token}&count=5`
    }
    request.get(options, (err, response, body) => {
      if(err) reject(err);
      let data = JSON.parse(body).data;
      resolve(data.map(photo => {
        return {
          link: photo.link,
          url: photo.images.standard_resolution.url
        }
      }));
    });
  });
}
