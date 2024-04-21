const { DataTypes } = require("sequelize");

const ApplicationModel = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    applier: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    // tournamentId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    status: {
        type: DataTypes.ENUM("pending", "approved", "rejected"),
        allowNull: false,
        defaultValue: "pending",
    },
}

module.exports = ApplicationModel;
