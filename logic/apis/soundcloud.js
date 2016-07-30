import request from 'request';
import config from '../../config/config';
let keys = config().keys;

export default function soundcloud() {
  return new Promise((resolve, reject) => {
    let options = {
      url: `http://api.soundcloud.com/users/22982175/favorites?client_id=${keys.soundcloud.clientID}`
    }
    request.get(options, (err, response, body) => {
      if(err) reject(err);
      resolve(JSON.parse(body).slice(0 ,20).map(node => {
        return {
          title: node.title,
          user: node.user.username,
          media: node.artwork_url,
          url: node.permalink_url,
          id: node.id
        }
      }));
    });
  });
}
