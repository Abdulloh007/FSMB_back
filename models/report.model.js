const { sequelize } = require("../sequelize.db");
const { DataTypes } = require("sequelize");

const ReportModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  from: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("pending", "approved", "rejected"),
    allowNull: false,
    defaultValue: "pending",
  },
}

module.exports = ReportModel;
