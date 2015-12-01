import { memoMaker } from './apiCaller';

module.exports = (app) => {
  let memoCheck = memoMaker(app);
  return {
    getBlog: (req, res, next) => {
      memoCheck("posts", res);
    },
    getImages: (req, res, next) => {
      memoCheck("photos", res);
    },
    getTwitter: (req, res, next) => {
      memoCheck("tweets", res);
    },
    getGithub: (req, res, next) => {
      memoCheck("repos", res);
    },
    getPocket: (req, res, next) => {
      memoCheck("articles", res);
    },
    getSoundcloud: (req, res, next) => {
      memoCheck("tracks", res);
    },
    getInstagram: (req, res, next) => {
      memoCheck("images", res);
    },
    getYoutube: (req, res) => {
      memoCheck("videos", res);
    }
  }
}
