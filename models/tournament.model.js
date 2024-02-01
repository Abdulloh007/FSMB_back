const { sequelize } = require("../sequelize.db");
const { DataTypes } = require("sequelize");

const Tournament = sequelize.define("tournaments", {
  id: {
    type: DataTypes.UUID,
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
    type: DataTypes.STRING,
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
  league: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  league: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Tournament.sync()
  .then((data) => {
    console.log("Tournaments Table and model synced!!");
  })
  .catch((err) => {
    console.log("Error syncing table and model!!");
  });

module.exports = Tournament;
