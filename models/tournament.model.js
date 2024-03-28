const { sequelize } = require("../sequelize.db");
const { DataTypes } = require("sequelize");

const Tournament = sequelize.define("tournaments", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  owner: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  gender: {
    type: DataTypes.ENUM("male", "female"),
    allowNull: false,
  },
  nomination: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ageFrom: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ageTo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  league: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  first_place: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  second_place: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  third_place: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  fourth_place: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = Tournament;
