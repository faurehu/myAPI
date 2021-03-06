import md from 'marked';
import googl from 'goo.gl';
import config from '../config/config';
let keys = config().keys;
googl.setKey(keys.google.key);

let monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

module.exports = (app) => {
  return {
    getPost: (req, res, next) => {

      let handleError = (err) => { res.status(500); return next(err); }


      let response = (data) => {
        if(data == null && typeof data  === "object") {
          next();
        }
        let date = new Date(data.createdAt);
        let link = req.protocol + '://' + req.get('host') + req.originalUrl;

        googl.shorten(link).then((shortURL) => {
          let post = {
            title: data.title,
            subtitle: data.subtitle,
            content: data.content,
            date: `${monthNames[date.getMonth()]} ${date.getDay()} , ${date.getFullYear()}`,
            sharelink: link,
            commentlink: `https://twitter.com/intent/tweet?text=Hi @faurehu, here's what I thought about ${shortURL}:`
          }
          res.render('post', {md: md, post: post});
        }).catch(handleError);
      }

      app.get('models').post.findById(req.params.post)
      .then(response).catch(handleError);
    }
  }
}
