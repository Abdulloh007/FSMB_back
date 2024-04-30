const { Op } = require("sequelize");
const { Nominations, NominationsType } = require("../models/index.model");
const { User } = require("../models/index.model");
const { League } = require("../models/index.model");

async function getNominationById(req, res) {
    try {
        const nominationId = req.params.id;
        const nomination = await Nominations.findOne({
            where: {
                id: nominationId,
            },
        });

        res.status(200).json({ nomination });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function newNomination(req, res) {
    try {
        const { name, type, weight, gender, ageFrom, ageTo, league } = req.body;
        const newNomination = await Nominations.create({
            titleId: name, type, weight, gender, ageFrom, ageTo
        });

        newNomination.addLeagues(league)

        res.status(200).json({ nomination: newNomination, msg: "Номинация успешно создан" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function getAllNominations(req, res) {
    try {
        const { type, weight, gender, ageFrom, ageTo } = req.query;
        let filter = {};

        if (type) {
            filter.type = type;
        }

        if (weight) {
            filter.weight = weight;
        }

        if (gender) {
            filter.gender = gender;
        }

        if (ageFrom) {
            filter.ageFrom = ageFrom;
        }

        if (ageTo) {
            filter.ageTo = ageTo;
        }

        const nominations = await Nominations.findAll({ where: filter, include: ["title", League] });
        res.status(200).json({ nominations });
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}

async function deleteNomination(req, res) {
    try {
        const nominationId = req.params.id;
        const nomination = await Nominations.findByPk(nominationId);

        if (!nomination) {
            return res.status(404).json({ error: "Номинация не найден" });
        }

        if (req.user.id !== nomination.owner) {
            return res
                .status(403)
                .json({ error: "Недостаточно прав для удаления номинации" });
        }

        await nomination.destroy();
        res.status(200).json({ message: "Номинация успешно удален" });
    } catch (error) {
        res.status(409).json({ error: "Произошла ошибка при удалении номинации" });
    }
}

async function editNomination(req, res) {
    try {
        const nominationId = req.params.id;
        const { name, type, weight, gender, ageFrom, ageTo } =
            req.body;
        const nomination = await Nominations.findByPk(nominationId);

        if (!nomination) {
            return res.status(404).json({ error: "Клуб не найден" });
        }

        nomination.titleId = name;
        nomination.type = type;
        nomination.weight = weight;
        nomination.gender = gender;
        nomination.ageFrom = ageFrom;
        nomination.ageTo = ageTo;

        await nomination.save();

        res.status(200).json({ nomination, message: "Клуб успешно отредактирован" });
    } catch (error) {
        res.status(409).json({ error: "Произошла ошибка при редактировании клуба" });
    }
}


async function newNominationType(req, res) {
    try {
        const { name } = req.body;
        const newNominationType = await NominationsType.create({
            name
        });

        res.status(200).json({ nomination_type: newNominationType, msg: "Номинация успешно создан" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function getAllNominationsTypes(req, res) {
    try {
        const nomination_types = await NominationsType.findAll();
        res.status(200).json({ nomination_types });
    } catch (error) {
        res.status(409).json({ error: "Произошла ошибка при получении клубов" });
    }
}


module.exports = {
    getNominationById,
    newNomination,
    getAllNominations,
    editNomination,
    deleteNomination,
    /**/
    newNominationType,
    getAllNominationsTypes
};
