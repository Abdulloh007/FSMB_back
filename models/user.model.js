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
    weight: {
      type: DataTypes.FLOAT,
    },
    height: {
      type: DataTypes.FLOAT,
    },
    head: {
      type: DataTypes.STRING,
    },
    helmet: {
      type: DataTypes.STRING,
    },
    armor: {
      type: DataTypes.STRING,
    },
    shoes: {
      type: DataTypes.STRING,
    },

    family: {
      type: DataTypes.STRING,
      allowNull: true,
      get() {
        return this.getDataValue("family").split(";");
      },
      set(val) {
        this.setDataValue("family", val.join(";"));
      },
    },
    coach: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.INTEGER,
    },
    roles: {
      type: DataTypes.ENUM(UserRoleEnum),
      defaultValue: "guest",
      allowNull: true,
      get() {
        return this.getDataValue("roles")
          ? this.getDataValue("roles").split(";")
          : [];
      },
      set(val) {
        this.setDataValue("roles", val ? val.join(";") : null);
      },
    },
  },
  {
    timestamps: false,
  }
);

// User.sync()
//   .then((data) => {
//     console.log("User Table and model synced!!");
//   })
//   .catch((err) => {
//     console.log("Error syncing table and model!!");
//   });

module.exports = User;
