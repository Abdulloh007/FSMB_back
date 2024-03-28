const { DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize.db");

const Category = sequelize.define(
    'category',
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
        parent: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
    },
    {
        timestamps: true
    }
);

module.exports = Category