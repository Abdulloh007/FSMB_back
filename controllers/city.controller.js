const City = require("../models/city.model");

async function getCities(req, res) {
  try {
    const cities = await City.findAll();
    res.json(cities);
  } catch (error) {
    res.status(500).json({ msg: "Ошибка при получения городов." });
  }
}

async function newCity(req, res) {
  try {
    const user = req.user;

      if (!user.roles || !user.roles.includes('admin')) {
        return res.status(403).json({ msg: "Только админы могут добавлять новые города." });
      }

    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ msg: "Имя города обязательное поле." });
    }

    const existingCity = await City.findOne({ where: { name } });
    if (existingCity) {
      return res.status(400).json({ msg: "Город уже существует." });
    }

    const newCity = await City.create({ name });

    res.status(201).json(newCity);
  } catch (error) {
    res.status(500).json({ msg: "Ошибка при создание нового города." });
  }
}

module.exports = {
  getCities,
  newCity
};
