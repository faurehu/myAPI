import nodemailer from 'nodemailer';
import config from './config';
let mail = config().mail;

module.exports = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: mail.user,
    pass: mail.pass
  }
});
