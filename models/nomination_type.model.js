const { DataTypes } = require("sequelize");

const NominationsTypeModel = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}

module.exports = NominationsTypeModel