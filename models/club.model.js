const { sequelize } = require("../sequelize.db");
const { DataTypes } = require("sequelize");

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
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    membersAge: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    league: {
      type: DataTypes.STRING,
      allowNull: true,
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
// Club.sync()
//   .then((data) => {
//     console.log("Clubs Table and model synced!!");
//   })
//   .catch((err) => {
//     console.log("Error syncing table and model!!");
//   });
module.exports = Club;
