import request from 'request';
import config from '../../config/config';
let keys = config().keys;

export default function youtube() {
  return new Promise((resolve, reject) => {
    let options = {
      url: `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLKuiYq4-bq_xbGq09B8u76cJCfek0bm9N&maxResults=6&key=${keys.google.key}`
    };
    request.get(options, (err, response, body) => {
      if(err) reject(err);
      let data = JSON.parse(body).items;
      data.reverse();
      let processedResponse  = data.filter(node => { return node.snippet.title != 'Deleted video'})
                                    .map(node => {
                                      return {
                                        title: node.snippet.title,
                                        id: node.snippet.resourceId.videoId,
                                        media: node.snippet.thumbnails.medium.url
                                      }
                                    });
      resolve(processedResponse);
  });
  });
}
