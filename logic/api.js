module.exports = (app) => {
  return {
    getBlog: (req, res) => {

      let response = (data) => {
        res.json(data.map((node) => {
          return node.dataValues;
        }));
      }

      app.get('models').Post.findAll()
      .then(response).catch((err) => { console.log(err); });
    },
    getImages: (req, res) => {

      let response = (data) => {
        res.json(data.map((node) => {
          return node.dataValues;
        }));
      }

      app.get('models').Image.findAll()
      .then(response).catch((err) => { console.log(err); });
    },
    getTwitter: (req, res) => {

    },
    getGithub: (req, res) => {

    },
    getPocket: (req, res) => {

    },
    getSoundcloud: (req, res) => {

    },
    getInstagram: (req, res) => {

    },
    getVideos: (req, res) => {

    },
    getLinks: (req, res) => {
      
    }
  }
}
