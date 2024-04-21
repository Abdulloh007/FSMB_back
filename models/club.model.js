const { sequelize } = require("../sequelize.db");
const { DataTypes } = require("sequelize");
const User = require("./user.model");

const ClubModel = {
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
  // ownerId: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  // },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  membersAge: {
    type: DataTypes.ENUM("children", "adults", "teenagers"),
    allowNull: true,
  },
  // league: {
  //   type: DataTypes.STRING,
  //   allowNull: true,
  //   get() {
  //     const rawValue = this.getDataValue('league');
  //     if (rawValue !== null) return rawValue.split('; ').map(id => parseInt(id))
  //     return null
  //   },
  //   set(value) {
  //     let newRawValue = ''
  //     value.map((val, idx) => idx + 1 !== value.length ? newRawValue += val + '; ' : newRawValue += val)
  //     this.setDataValue('league', newRawValue)
  //   }
  // },
  accreditation: {
    type: DataTypes.BOOLEAN,
  },
}

module.exports = ClubModel;
