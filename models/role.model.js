const { sequelize } = require("../sequelize.db");
const { DataTypes } = require("sequelize");
const UserRoleEnum = [
  "admin",
  "athlet",
  "manager",
  "guest",
  "judge",
  "clubHead",
  "parent",
];
const UserRole = sequelize.define("user_roles", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  roles: {
    type: DataTypes.ENUM(UserRoleEnum),
    defaultValue: "guest",
    allowNull: false,
  },
});

module.exports = UserRole;
