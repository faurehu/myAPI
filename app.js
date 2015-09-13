import express from 'express';
let app = express();

require('./config/init')(app);
require('./config/errors')(app);


module.exports = app;
