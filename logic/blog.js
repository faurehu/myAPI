import md from 'marked';
import googl from 'goo.gl';
import { googleKey } from '../config/config';
googl.setKey(googleKey);

let monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

module.exports = (app) => {
  return {
    getPost: (req, res) => {

      let response = (data) => {

        let date = new Date(data.createdAt);
        let link = req.protocol + '://' + req.get('host') + req.originalUrl;

        googl.shorten(link).then((shortURL) => {
          let post = {
            title: data.title,
            subtitle: data.subtitle,
            content: data.content,
            date: `${monthNames[date.getMonth()]} ${date.getDay()} , ${date.getFullYear()}`,
            link: `https://twitter.com/intent/tweet?text=Hi @faurehu, here's what I thought about ${shortURL}:`
          }
          res.render('post', {md: md, post: post});
        })
      }

      app.get('models').Post.findById(req.params.post)
      .then(response).catch((err) => { console.log(err); });
    }
  }
}
