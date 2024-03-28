const { sequelize } = require("../sequelize.db");
const { DataTypes } = require("sequelize");
const UserRole = require("./role.model");

const User = sequelize.define(
  "users",
  {
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
    club:{
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    coach: {
      type: DataTypes.INTEGER,
    },
    city: {
      type: DataTypes.INTEGER,
    },
    gender: {
      type: DataTypes.ENUM("male", "female"),
    },
    rating: {
      type: DataTypes.FLOAT,
    },
  },
  {
    timestamps: true,
  }
);

User.hasMany(UserRole, { foreignKey: "userId" });
UserRole.belongsTo(User, { foreignKey: "userId" });

module.exports = User;
