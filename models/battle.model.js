const { DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize.db");

const Battle = sequelize.define(
    'battle',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
    }
);