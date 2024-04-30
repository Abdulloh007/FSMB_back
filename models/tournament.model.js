const { DataTypes } = require("sequelize");

const TournamentModel = {
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
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('regional', 'city', 'international'),
    allowNull: false
  },
  gridView: {
    type: DataTypes.ENUM('e2e', 'knock-out'),
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  dateFrom: {
    type: DataTypes.DATE,
    allowNull: false
  },
  dateTo: {
    type: DataTypes.DATE,
    allowNull: false
  },
  applicationDeadline: {
    type: DataTypes.DATE,
    allowNull: false
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
}

module.exports = TournamentModel;