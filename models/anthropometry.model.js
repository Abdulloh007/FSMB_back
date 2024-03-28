const { sequelize } = require("../sequelize.db");
const { DataTypes } = require("sequelize");
const User = require("./user.model");

const Anthropometry = sequelize.define(
  "anthropometry",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weight: {
      type: DataTypes.FLOAT,
    },
    height: {
      type: DataTypes.FLOAT,
    },
    shoes: {
      type: DataTypes.STRING,
    },
    armor: {
      type: DataTypes.STRING,
    },
    head: {
      type: DataTypes.STRING,
    },
    helmet: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);


module.exports = Anthropometry;
