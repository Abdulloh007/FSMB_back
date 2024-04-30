const { Tournament } = require("../models/index.model");
const { League } = require("../models/index.model");
const { User } = require("../models/index.model");

const GenderEnum = {
  MALE: "male",
  FEMALE: "female",
};
const typeEnum = ['regional', 'city', 'international']
const gridViewEnum = ['e2e', 'knock-out']

async function createTournament(req, res) {
  try {
    const userId = req.user.id;
    const {
      name,
      type,
      city,
      gridView,
      address,
      dateFrom,
      dateTo,
      applicationDeadline,
      price,
      nomination,
      secretary,
    } = req.body;

    if (
      !name ||
      !type ||
      !city ||
      !gridView ||
      !address ||
      !dateFrom ||
      !dateTo ||
      !applicationDeadline ||
      !price ||
      !nomination ||
      !secretary
    ) {
      return res.status(400).json({ error: "Все поля обязательны!", payload: req.body });
    }

    if (!typeEnum.includes(type)) {
      return res.status(400).json({ error: "Недопустимое значение поля!" });
    }
    if (!gridViewEnum.includes(gridView)) {
      return res.status(400).json({ error: "Недопустимое значение поля!" });
    }

    const newTournament = await Tournament.create({
      name,
      type,
      city,
      gridView,
      address,
      dateFrom,
      dateTo,
      applicationDeadline,
      price,
      nomination,
      ownerId: userId
    });

    newTournament.addUsers(secretary)

    res.status(200).json({ message: "Успешно создано!", data: newTournament });

  } catch (error) {

    console.log(error);
    res.status(400).json({ error: "Не удалось создать турнир!" });

  }
}

async function getAllTournaments(req, res) {
  try {
    const { city, gender, nomination, ageFrom, ageTo, league, owner } = req.query;
    let filter = {};

    if (city) {
      filter.city = city;
    }

    if (gender && Object.values(GenderEnum).includes(gender)) {
      filter.gender = gender;
    }

    if (nomination) {
      filter.nomination = nomination;
    }
    if (league) {
      filter.league = league;
    }
    if (ageFrom) {
      filter.ageFrom = ageFrom;
    }

    if (ageTo) {
      filter.ageTo = ageTo;
    }

    if (owner) {
      filter.ownerId = owner;
    }

    let tournaments = await Tournament.findAll({ where: filter, include: ["owner"] });

    tournaments = tournaments.map(item => {
      item.dataValues.owner = {
        id: item.owner.id,
        name: item.owner.name,
        surname: item.owner.surname,
        patronymic: item.owner.patronymic,
      }
      return item
    })


    res.status(200).json({ data: tournaments });
  } catch (error) {
    res.status(400).json({ error: "Не удалось получить турниры!" });
  }
}

async function getMyTournaments(req, res) {
  try {
    const { city, gender, nomination, ageFrom, ageTo, league } = req.query;
    let filter = {};

    if (city) {
      filter.city = city;
    }

    if (gender && Object.values(GenderEnum).includes(gender)) {
      filter.gender = gender;
    }

    if (nomination) {
      filter.nomination = nomination;
    }
    if (league) {
      filter.league = league;
    }
    if (ageFrom) {
      filter.ageFrom = ageFrom;
    }

    if (ageTo) {
      filter.ageTo = ageTo;
    }


    const tournaments = await Tournament.findAll({ where: { ...filter, owner: req.user.id } });
    res.status(200).json({ data: tournaments });
  } catch (error) {
    res.status(409).json({ error: "Не удалось получить турниры!" });
  }
}

async function updateTournament(req, res) {
  try {
    const tournamentId = req.params.id;
    const userId = req.user.id;
    const tournament = await Tournament.findByPk(tournamentId);

    if (!tournament) {
      return res.status(404).json({ error: "Турнир не найден!" });
    }

    if (parseInt(tournament.owner) !== userId) {
      return res
        .status(403)
        .json({ error: "Нет прав для обновления этого турнира!" });
    }

    const {
      name,
      city,
      address,
      date,
      price,
      nomination,
    } = req.body;

    if (
      !name ||
      !city ||
      !address ||
      !date ||
      !price ||
      !nomination
    ) {
      return res.status(400).json({ error: "Все поля обязательны!" });
    }

    if (!Object.values(GenderEnum).includes(gender)) {
      return res.status(400).json({ error: "Недопустимое значение пола!" });
    }

    await Tournament.update(
      {
        name,
        city,
        address,
        date,
        price,
        gender,
        nomination,
        ageFrom,
        ageTo,
        league,
      },
      { where: { id: tournamentId } }
    );

    res.status(200).json({ message: "Успешно обновлено!" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Не удалось обновить турнир!" });
  }
}

async function deleteTournament(req, res) {
  try {
    const tournamentId = req.params.id;
    const userId = req.user.id;

    const tournament = await Tournament.findByPk(tournamentId);
    if (!tournament) {
      return res.status(404).json({ error: "Турнир не найден!" });
    }

    if (parseInt(tournament.owner) !== userId) {
      return res
        .status(403)
        .json({ error: "Нет прав для удаления этого турнира!" });
    }

    await Tournament.destroy({
      where: { id: tournamentId },
    });

    res.status(200).json({ message: "Успешно удалено!" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Не удалось удалить турнир!" });
  }
}

module.exports = {
  createTournament,
  getAllTournaments,
  getMyTournaments,
  updateTournament,
  deleteTournament,
};
