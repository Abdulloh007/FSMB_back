const { Op } = require("sequelize");
const { League } = require('../models/index.model');

async function createLeague(req, res) {
    try {
        const userId = req.user.id;
        const {
            name,
            parent,
            weightCat
        } = req.body;

        if (!name) return res.status(400).json({ error: "Пропущено обязательное поле!" })

        const newLeague = await League.create({
            name,
            parent,
            weightCat
        })
        res.status(200).json({ message: "Успешно создано!", data: newLeague });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Не удалось создать лигу!" })
    }
}

async function getAllLeagues(req, res) {
    try {
        const {
            name,
            parent,
            weightCat
        } = req.body;
        let filter = {};

        if (name) filter.name = name;
        if (parent) filter.parent = parent;
        if (weightCat) filter.weightCat = weightCat;

        const leagues = await League.findAll({ where: filter });
        res.status(200).json({ data: leagues });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Не удалось поучить лиги!" });
    }
}

async function updateLeague(req, res) {
    try {
        const leagueId = req.params.id;
        const userId = req.user.id;
        const league = await League.findByPk(leagueId);

        if (!league) {
            return res.status(404).json({ error: "Лига не найдена!" });
        }

        const {
            name,
            parent,
            weightCat
        } = req.body;

        if (!name) return res.status(400).json({ error: "Пропущено обязательное поле!" })

        const leagues = League.update(
            {
                name,
                parent,
                weightCat
            },
            { where: leagueId }
        );
        res.status(200).json({ message: "Успешно обновлено!" });

    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Не удалось обновить лигу!" });
    }
}

async function deleteLeague(req, res) {
    try {
        const leagueId = req.params.id;
        const userId = req.user.id;

        const league = await League.findByPk(leagueId);
        if (!league) {
            return res.status(404).json({ error: "Лига не найден!" });
        }

        await League.destroy({
            where: { id: leagueId },
        });

        res.status(200).json({ message: "Успешно удалено!" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Не удалось удалить лигу!" });
    }
}


module.exports = {
    createLeague,
    getAllLeagues,
    updateLeague,
    deleteLeague
}