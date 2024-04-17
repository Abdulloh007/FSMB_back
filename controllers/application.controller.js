const {Tournament} = require("../models/tournament.model");
const League = require("../models/league.model");
const User = require("../models/user.model");
const {Application} = require("../models/tournament.model");
const GenderEnum = {
    MALE: "male",
    FEMALE: "female",
};
const statusEnum = ["pending", "approved", "rejected"]

async function createApplication(req, res) {
    try {
        const userId = req.user.id;
        const {
            tournamentId,
            status
        } = req.body;

        if (
            !tournamentId
        ) {
            return res.status(400).json({ message: "Все поля обязательны!", payload: req.body });
        }

        if (status && !statusEnum.includes(status)) {
            return res.status(400).json({ message: "Недопустимое значение поля!" });
        }
        
        const applyingTournament = await Tournament.findByPk(tournamentId)

        if (!applyingTournament) {
            return res.status(400).json({ message: "Недопустимое значение поля!" });
        }

        const newApplication = await Application.create({
            applier: userId,
            tournamentId,
            status
        });

        res.status(200).json({ message: "Успешно создано!", data: newApplication });

    } catch (error) {

        console.log(error);
        res.status(400).json({ message: "Не удалось создать заявку!" });

    }
}

async function getAllApplications(req, res) {
    try {
        const { applier, tournamentId, status } = req.query;
        let filter = {};

        if (applier) {
            filter.applier = applier;
        }
        
        if (tournamentId) {
            filter.tournamentId = tournamentId;
        }

        if (status && statusEnum.includes(status)) {
            filter.status = status;
        }

        const applications = await Application.findAll({ where: filter, include: Tournament });
        res.status(200).json({ data: applications });
    } catch (error) {
        res.status(400).json({ message: error });
    }
}

async function getMyApplications(req, res) {
    try {
        const { tournamentId, status } = req.query;
        let filter = {};
        const userId= req.user.id
        if (tournamentId) {
            filter.tournamentId = tournamentId;
        }

        if (status && statusEnum.includes(status)) {
            filter.status = status;
        }

        const applications = await Application.findAll({ where: {...filter, applier: userId}, include: Tournament });
        res.status(200).json({ data: applications });
    } catch (error) {
        res.status(400).json({ message: "Не удалось получить турниры!" });
    }
}

async function updateApplication(req, res) {
    try {
        const applicationId = req.params.id;
        const userId = req.user.id;

        const application = await Application.findByPk(applicationId);

        if (!application) {
            return res.status(404).json({ message: "Турнир не найден!" });
        }

        if (parseInt(application.applier) !== userId) {
            return res
                .status(403)
                .json({ message: "Нет прав для обновления этого турнира!" });
        }

        const {
            applier, tournamentId, status
        } = req.body;

        if (
            !applier ||
            !tournamentId ||
            !status
        ) {
            return res.status(400).json({ message: "Все поля обязательны!" });
        }

        if (!statusEnum.includes(status)) {
            return res.status(400).json({ message: "Недопустимое значение пола!" });
        }

        await Application.update(
            {
                applier, tournamentId, status
            },
            { where: { id: applicationId } }
        );

        res.status(200).json({ message: "Успешно обновлено!" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Не удалось обновить турнир!" });
    }
}

async function deleteApplication(req, res) {
    try {
        const applicationId = req.params.id;
        const userId = req.user.id;

        const application = await Application.findByPk(applicationId);
        if (!application) {
            return res.status(404).json({ message: "Турнир не найден!" });
        }

        if (parseInt(application.applier) !== userId) {
            return res
                .status(403)
                .json({ message: "Нет прав для удаления этого турнира!" });
        }

        await Application.destroy({
            where: { id: applicationId },
        });

        res.status(200).json({ message: "Успешно удалено!" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Не удалось удалить турнир!" });
    }
}

module.exports = {
    createApplication,
    getAllApplications,
    getMyApplications,
    updateApplication,
    deleteApplication,
};
