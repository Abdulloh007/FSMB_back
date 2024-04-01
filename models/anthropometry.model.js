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
      defaultValue: 0.00
    },
    height: {
      type: DataTypes.FLOAT,
      defaultValue: 0.00
    },
    shoes: {
      type: DataTypes.FLOAT,
      defaultValue: 0.00
    },
    armor: {
      type: DataTypes.FLOAT,
      defaultValue: 0.00
    },
    head: {
      type: DataTypes.FLOAT,
      defaultValue: 0.00
    },
    helmet: {
      type: DataTypes.FLOAT,
      defaultValue: 0.00
    },
  },
  {
    timestamps: true,
  }
);


module.exports = Anthropometry;
