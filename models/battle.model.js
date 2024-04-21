const { DataTypes } = require("sequelize");

const BattleModel = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    // fighter_1: {
    //     type: DataTypes.ARRAY(DataTypes.INTEGER),
    //     allowNull: false
    // },
    // fighter_2: {
    //     type: DataTypes.ARRAY(DataTypes.INTEGER),
    //     allowNull: true
    // },
    fihgter_1_points: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0
    },
    fihgter_2_points: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0
    },
    battle_protest: {
        type: DataTypes.DATE,
        allowNull: true
    },
    // winner: {
    //     type: DataTypes.ARRAY(DataTypes.INTEGER),
    //     allowNull: true
    // },
    // loser: {
    //     type: DataTypes.ARRAY(DataTypes.INTEGER),
    //     allowNull: true
    // },
    status: {
        type: DataTypes.ENUM(['appointed', 'started', 'finished', 'suspended', 'canceled']) // назначен, начат, завершон, приостановлен, отменен.
    }
}

module.exports = BattleModel