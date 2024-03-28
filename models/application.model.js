const Tournament = require("./tournament.model");
const { sequelize } = require("../sequelize.db");
const { DataTypes } = require("sequelize");

const Application = sequelize.define("applications", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  applier: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tournamentId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "tournaments",
      key: "id",
    },
  },
  status: {
    type: DataTypes.ENUM("pending", "approved", "rejected"),
    allowNull: false,
    defaultValue: "pending",
  },
});

module.exports = Application;
