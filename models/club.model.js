const { sequelize } = require("../sequelize.db");
const { DataTypes } = require("sequelize");
const User = require("./user.model");

const Club = sequelize.define(
  "clubs",
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
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    owner: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    membersAge: {
      type: DataTypes.ENUM("children", "adults", "teenagers"),
      allowNull: true,
    },
    league: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    accreditation: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    timestamps: true,
  }
);
Club.belongsTo(User, { foreignKey: "owner" });

module.exports = Club;
