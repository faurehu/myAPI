import express from 'express';
let app = express();

app.set('models', require('./model'));
require('./config/init')(app);
require('./routes')(app);
require('./config/errors')(app);

export default app;
