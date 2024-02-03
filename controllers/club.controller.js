const { Op } = require("sequelize");
const Club = require("../models/club.model");

async function getClubs(req, res) {
  try {
    const clubs = await Club.findAll();

    res.status(200).json({ clubs });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
}
async function getClubById(req, res) {
  try {
    const clubId = req.params.id;
    const club = await Club.findOne({
      where: {
        id: clubId,
      },
    });
    res.status(200).json({ club });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
}

async function newClub(req, res) {
  try {
    const user = req.user;
    const { name, city, address, phone, email, description } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ msg: "Некорректный формат электронной почты" });
    }

    const phoneRegex = /^\+992\d{9}$/;
    if (!phoneRegex.test(phone)) {
      return res
        .status(400)
        .json({ msg: "Некорректный формат номера телефона" });
    }
    const newClub = await Club.create({
      name,
      city,
      address,
      description,
      phone,
      email,
      owner: user.id,
    });
    res.status(200).json({ club: newClub, msg: "Клуб успешно создан" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
}
module.exports = {
  getClubs,
  getClubById,
  newClub,
};
