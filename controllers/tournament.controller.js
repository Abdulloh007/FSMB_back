const City = require("../models/city.model");
const Tournament = require("../models/tournament.model");
const GenderEnum = {
  MALE: "male",
  FEMALE: "female",
};
async function createTournament(req, res) {
  try {
    const userId = req.user.id;
    const {
      name,
      cityId,
      address,
      date,
      price,
      gender,
      nomination,
      ageFrom,
      ageTo,
    } = req.body;

    if (
      !name ||
      !cityId ||
      !address ||
      !date ||
      !price ||
      !gender ||
      !nomination ||
      !ageFrom ||
      !ageTo
    ) {
      return res.status(400).json({ message: "Все поля обязательны!" });
    }

    if (!Object.values(GenderEnum).includes(gender)) {
      return res.status(400).json({ message: "Недопустимое значение пола!" });
    }

    const city = await City.findByPk(cityId);
    if (!city) {
      return res.status(400).json({ message: "Город не найден!" });
    }

    const cityName = city.name;

    const newTournament = await Tournament.create({
      name,
      city: cityName,
      address,
      date,
      price,
      gender,
      nomination,
      ageFrom,
      ageTo,
      owner: userId,
    });
    res
      .status(200)
      .json({ message: "Успешно создано!", data: newTournament });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Не удалось создать турнир!" });
  }
}
async function getAllTournaments(req, res) {
  try {
    const tournaments = await Tournament.findAll();
    res.status(200).json({ data: tournaments });
  } catch (error) {
    res.status(400).json({ message: "Не удалось получить турниры!" });
  }
}
async function updateTournament(req, res) {
  try {
    const tournamentId = req.params.id;
    const userId = req.user.id;
    console.log(userId);
    const tournament = await Tournament.findByPk(tournamentId);
    console.log(tournament);
    if (!tournament) {
      return res.status(404).json({ message: "Турнир не найден!" });
    }

    if (parseInt(tournament.owner) !== userId) {
      return res
        .status(403)
        .json({ message: "Нет прав для обновления этого турнира!" });
    }

    const {
      name,
      cityId,
      address,
      date,
      price,
      gender,
      nomination,
      ageFrom,
      ageTo,
    } = req.body;

    if (
      !name ||
      !cityId ||
      !address ||
      !date ||
      !price ||
      !gender ||
      !nomination ||
      !ageFrom ||
      !ageTo
    ) {
      return res.status(400).json({ message: "Все поля обязательны!" });
    }

    if (!Object.values(GenderEnum).includes(gender)) {
      return res.status(400).json({ message: "Недопустимое значение пола!" });
    }

    const city = await City.findByPk(cityId);
    if (!city) {
      return res.status(400).json({ message: "Город не найден!" });
    }

    const cityName = city.name;

    await Tournament.update(
      {
        name,
        city: cityName,
        address,
        date,
        price,
        gender,
        nomination,
        ageFrom,
        ageTo,
      },
      { where: { id: tournamentId } }
    );

    res.status(200).json({ message: "Успешно обновлено!" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Не удалось обновить турнир!" });
  }
}

async function deleteTournament(req, res) {
  try {
    const tournamentId = req.params.id;
    const userId = req.user.id; 

    const tournament = await Tournament.findByPk(tournamentId);
    if (!tournament) {
      return res.status(404).json({ message: "Турнир не найден!" });
    }

    if (parseInt(tournament.owner) !== userId) {
      return res
        .status(403)
        .json({ message: "Нет прав для удаления этого турнира!" });
    }

    await Tournament.destroy({
      where: { id: tournamentId },
    });

    res.status(200).json({ message: "Успешно удалено!" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Не удалось удалить турнир!" });
  }
}
module.exports = {
  createTournament,
  getAllTournaments,
  updateTournament,
  deleteTournament,
};
