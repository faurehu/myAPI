module.exports = (app) => {
  return {
    getBlog: (req, res) => {
      app.get('models').Post.findAll()
      .then((data) => { res.json(data); })
      .catch((err) => { console.log(err); });
      res.render('post');
    },
    getPost: (req, res) => {
      app.get('models').Post.findById(req.params.id)
      .then((data) => { res.json(data); })
      .catch((err) => { console.log(err); });
    }
  }
}
