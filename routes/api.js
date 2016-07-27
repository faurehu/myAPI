import express from 'express';
import { apiRoute } from '../config/routes';
import blog from '../logic/apis/blog';
import twitter from '../logic/apis/twitter';
import photo  from '../logic/apis/photography';
import github from '../logic/apis/github';
import youtube from '../logic/apis/youtube';
import pocket from '../logic/apis/pocket';
import instagram from '../logic/apis/instagram';
import soundcloud from '../logic/apis/soundcloud';
let router = express.Router();

let fetchInjector = (fetcher) => {
  return (req, res, next) => {
    fetcher().then(x => res.json(x));
  }
}


module.exports = (app) => {
  router.get(apiRoute.blog, fetchInjector(blog));
  router.get(apiRoute.twitter, fetchInjector(twitter));
  router.get(apiRoute.youtube, fetchInjector(youtube));
  router.get(apiRoute.github, fetchInjector(github));
  router.get(apiRoute.pocket, fetchInjector(pocket));
  router.get(apiRoute.soundcloud, fetchInjector(soundcloud));
  router.get(apiRoute.photo, fetchInjector(photo));
  router.get(apiRoute.instagram, fetchInjector(instagram));
  return router;
}
