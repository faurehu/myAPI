import request from 'request';
import config from '../../config/config';
let keys = config().keys;


export default function github() {
  return new Promise((resolve, reject) => {
    let options = {
      url: `https://api.github.com/user/repos?access_token=${keys.github.token}&visibility=public&affiliation=owner,collaborator&sort=updated`,
      headers: {
        'User-Agent': 'faurehu'
      }
    }
    request(options, (err, response, body) => {
      if(err) reject(err);
      let data = JSON.parse(body);
      resolve(data.map(repo => {
        return {
          name: repo.name,
          description: repo.description,
          language: repo.language,
          url: repo.html_url
        }
      }));
    });
  });
}
