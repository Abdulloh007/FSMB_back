const { sequelize } = require("../sequelize.db");
const { DataTypes } = require("sequelize");
const User = require("./user.model");

const ClubMebersModel = {
  role: {
    type: DataTypes.ENUM("leader", "casher", "couch", "secretary", "sportsman"),
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("pending", "approved", "rejected"),
    allowNull: false,
    defaultValue: "pending",
  }
}

module.exports = ClubMebersModel;
