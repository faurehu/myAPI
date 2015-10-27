module.exports = function(){
  switch(process.env.NODE_ENV){
  case 'development':
    return require('./devSettings');

  case 'production':
    return require('./prodSettings');

  default:
    return require('./devSettings');
  }
};
