const { DataTypes } = require("sequelize");

const CategoryModel =
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
}

module.exports = CategoryModel