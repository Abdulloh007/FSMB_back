const { DataTypes } = require("sequelize");

const NominationsModel = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    membersTitle: {
        type: DataTypes.ENUM("Мужчины", "Женщины", "Мальчики", "Девочки", "Юноши", "Девушки", "Юниоры", "Юниорки", "без разделения по полу и лиге"),
        allowNull: false,
        set() {

        }
    },
    type: {
        type: DataTypes.ENUM("individual", "group"),
        allowNull: false,
    },
    weight: {
        type: DataTypes.ENUM("light", "heavy"),
        allowNull: true
    },
    gender: {
        type: DataTypes.ENUM("male", "female"),
        allowNull: true
    },
    ageFrom: {
        type: DataTypes.INTEGER,
        allowNull: false,
        default: 0
    },
    ageTo: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
}

module.exports = NominationsModel