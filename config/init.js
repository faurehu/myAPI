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

  //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, '/../public')));

  let options = {
    form: {
      'consumer_key': keys.pocket.consumerKey,
      'redirect_uri': 'http://localhost:3000/callback/pocket'
    },
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'X-Accept': 'application/json'
    },
    url: 'https://getpocket.com/v3/oauth/request/'
  }

  request.post(options, (err, httpResponse, body) => {
    global.pocketSecretKey = body.code;
  })
}
