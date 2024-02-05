const { sequelize } = require("../sequelize.db");
const { DataTypes } = require("sequelize");
const User = require("./user.model");

const Family = sequelize.define(
  "family",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId1: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId2: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    relationship: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);
Family.belongsTo(User, { foreignKey: 'userId1', as: 'user1' });
Family.belongsTo(User, { foreignKey: 'userId2', as: 'user2' });
module.exports = Family;
