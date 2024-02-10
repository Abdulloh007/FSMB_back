const { sequelize } = require("../sequelize.db");
const { DataTypes } = require("sequelize");

const Tournament = sequelize.define("tournaments", {
  id: {
    type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
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
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  owner: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.ENUM("male" , "female"),
    allowNull: false,
  },
  nomination: {
    type: DataTypes.STRING,
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
  // league: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  // },
 
});


module.exports = Tournament;
