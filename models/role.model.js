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

const UserRoleModel = {
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
}

module.exports = UserRoleModel;
