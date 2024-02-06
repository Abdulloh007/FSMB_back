const { sequelize } = require("../sequelize.db");
const { DataTypes } = require("sequelize");

const City = sequelize.define(
  "cities",
  {
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
  },
  {
    timestamps: true,
  }
);

module.exports = City;
