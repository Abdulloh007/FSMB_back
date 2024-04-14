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
  owner: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  secretary: {
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
  league: {
    type: DataTypes.STRING,
    allowNull: true,
    get() {
      const rawValue = this.getDataValue('league');
      if (rawValue !== null) return rawValue.split('; ').map(id => parseInt(id))
      return null
    },
    set(value) {
      let newRawValue = ''
      value.map((val, idx) => idx + 1 !== value.length ? newRawValue += val + '; ' : newRawValue += val)
      this.setDataValue('league', newRawValue)
    }
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
