import Sequelize from 'sequelize';
import configFile from '../config/prodConfig';

let env = process.env.NODE_ENV || 'development';
let config = env === configFile[env];

let sequelize = new Sequelize(config.db.name, config.db.user, config.db.password, {
  host: config.db.host,
  port: config.db.port,
  maxConcurrentQueries: 100,
  dialect: config.db.dialect,
  pool: { maxConnections: 5, maxIdleTime: 30},
  language: 'en'
});

let models = [
  'Post',
  'Image',
  'AccessToken'
];

models.forEach(model => {
  module.exports[model] = sequelize.import(`./${model}`);
});


sequelize.sync()
  .error(error => {
    console.error(error);
    throw error;
  });

module.exports.sequelize = sequelize;
