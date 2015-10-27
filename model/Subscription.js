module.exports = function(sequelize, DataTypes) {

  var Subscription = sequelize.define('subscription', {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false
    },

    token: {
      type: DataTypes.STRING,
      allowNull: false
    },

    confirmed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }

  });

  return Subscription;
};
