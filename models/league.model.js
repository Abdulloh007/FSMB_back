const { DataTypes } = require("sequelize");

const LeagueModel = {
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
    parent: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    weightCat: {
        type: DataTypes.ENUM('light, heavy'),
        allowNull: true
    }
}

module.exports = LeagueModel