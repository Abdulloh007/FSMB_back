const { DataTypes } = require("sequelize");

const NominationsModel = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    membersTitle: {
        type: DataTypes.VIRTUAL,
        get() {
            if (this.getDataValue("ageTo") <= 5 && this.getDataValue("gender") === "male") {
                return "Мальчики"
            } else if (this.getDataValue("ageTo") <= 5 && this.getDataValue("gender") === "female") {
                return "Девочки"
            } else if (this.getDataValue("ageTo") <= 13 && this.getDataValue("gender") === "male") {
                return "Юноши"
            } else if (this.getDataValue("ageTo") <= 13 && this.getDataValue("gender") === "female") {
                return "Девушки"
            } else if (this.getDataValue("ageTo") <= 17 && this.getDataValue("gender") === "male") {
                return "Юниоры"
            } else if (this.getDataValue("ageTo") <= 17 && this.getDataValue("gender") === "female") {
                return "Юниорки"
            } else if (this.getDataValue("ageTo") > 17 && this.getDataValue("gender") === "male") {
                return "Мужчины"
            } else if (this.getDataValue("ageTo") > 17 && this.getDataValue("gender") === "female") {
                return "Женщины"
            } else {
                return "без разделения по полу"
            }
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