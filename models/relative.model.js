const { sequelize } = require("../sequelize.db");
const { DataTypes } = require("sequelize");
const User = require("./user.model");

const RelationshipType = [
  "Супруг(а)",
  "Ребенок",
  "Родитель",
  "Брат/Сестра",
  "Дедушка/Бабушка",
  "Внук(иня)",
  "Дядя",
  "Тетя",
  "Двоюродный(ая) брат/сестра",
  "Племянник",
  "Племянница",
  "Родственник(ца) по браку",
];

const RelativeModel = {
  relationship: {
    type: DataTypes.ENUM(RelationshipType),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("pending", "approved", "rejected"),
    allowNull: false,
    defaultValue: "pending",
  }
}

module.exports = RelativeModel;
