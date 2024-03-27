const { sequelize } = require("../sequelize.db");
const { DataTypes } = require("sequelize");
const User = require("./user.model");

const Club = sequelize.define(
  "clubs",
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
      type: DataTypes.ENUM("a", "b", "c", "d", "e", "f", "g", "h", "i"),
      allowNull: false,
    },
    accreditation: {
      type: DataTypes.BOOLEAN,
    },
    // members: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    //   get() {
    //     return this.getDataValue("members").split(";");
    //   },
    //   set(val) {
    //     this.setDataValue("members", val.join(";"));
    //   },
    // },
  },
  {
    timestamps: true,
  }
);
Club.belongsTo(User, { foreignKey: "owner" });

module.exports = Club;
