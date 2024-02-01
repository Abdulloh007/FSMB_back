const Tournament = require("./tournament.model");
const { sequelize } = require("../sequelize.db");
const { DataTypes } = require("sequelize");

const Application = sequelize.define("applications", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  playerName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
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

Tournament.hasMany(Application, { foreignKey: "tournamentId" });
Application.belongsTo(Tournament, { foreignKey: "tournamentId" });


Application.sync()
  .then((data) => {
    console.log("Applications Table and model synced!!");
  })
  .catch((err) => {
    console.log("Error syncing table and model!!");
  });
module.exports = Application