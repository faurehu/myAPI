module.exports = function(sequelize, DataTypes) {

  var AccessToken = sequelize.define('accessToken', {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
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
