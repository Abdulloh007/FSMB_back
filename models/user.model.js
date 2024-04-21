const { sequelize } = require("../sequelize.db");
const { DataTypes } = require("sequelize");
const UserRole = require("./role.model");

const UserModel = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  surname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  patronymic: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  birth: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  balance: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  photo: {
    type: DataTypes.STRING,
  },
  age: {
    type: DataTypes.INTEGER,
  },
  coach: {
    type: DataTypes.INTEGER,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: null
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true
  },
  gender: {
    type: DataTypes.ENUM("male", "female"),
  },
  rating: {
    type: DataTypes.FLOAT,
  },
}

module.exports = UserModel;
