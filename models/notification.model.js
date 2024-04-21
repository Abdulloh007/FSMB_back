const { DataTypes } = require("sequelize");

const NotificationModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  action: {
    type: DataTypes.JSON,
    allowNull: true
  }
}

module.exports = NotificationModel;
