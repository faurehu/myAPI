import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import express from 'express';
import request from 'request';
import { keys } from './config';

module.exports = (app) => {

  app.set('views', path.join(__dirname, '/../views'));
  app.set('view engine', 'jade');

  app.use(favicon(path.join(__dirname, '/../public/assets', 'icon.ico')));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, '/../public')));

  let twitterConsumerKey = process.env.TWITTER_KEY || keys.twitter.consumerKey;
  let twitterConsumerSecret = process.env.TWITTER_SECRET || keys.twitter.consumerSecret;

  let toEncode = `${twitterConsumerKey}:${twitterConsumerSecret}`;
  let buffer = new Buffer(toEncode);

  let options = {
    form: {
      'grant_type': 'client_credentials'
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'User-Agent': 'Faure Hu',
      'Authorization': `Basic ${buffer.toString('base64')}`
    },
    url: 'https://api.twitter.com/oauth2/token'
  }

  request.post(options, (err, httpResponse, body) => {
    global.twitterToken = JSON.parse(body).access_token;
  });
}
