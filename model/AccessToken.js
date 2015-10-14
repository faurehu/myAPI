module.exports = function(sequelize, DataTypes) {

  var AccessToken = sequelize.define('accesstoken', {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    userID: {
      type: DataTypes.INTEGER
    },

    service: {
      type: DataTypes.STRING
    },

    token: {
      type: DataTypes.STRING
    }

  });

  return AccessToken;
};
