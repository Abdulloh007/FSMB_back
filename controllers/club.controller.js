const { Op } = require("sequelize");
const Club = require("../models/club.model");
const User = require("../models/user.model");
const League = require("../models/league.model");

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
    const { name, city, address, phone, email, description, league } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ msg: "Некорректный формат электронной почты" });
    }

    if (!isNaN(phone) && phone.lenght > 8 && phone.lenght < 12) {
      return res
        .status(400)
        .json({ msg: "Некорректный формат номера телефона" });
    }

    if (league.lenght <= 0) {
      return res.status(400).json({ message: "Недопустимое значение лиги!" });
    }

    const newClub = await Club.create({
      name,
      city,
      address,
      description,
      phone,
      email,
      league,
      owner: user.id,
    });
    res.status(200).json({ club: newClub, msg: "Клуб успешно создан" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
}

async function getAllClubs(req, res) {
  try {
    const { city, name, membersAge, league } = req.query;
    let filter = {};

    if (city) {
      filter.city = city;
    }

    if (name) {
      filter.name = name;
    }
    if (membersAge) {
      filter.membersAge = membersAge;
    }
    if (league) {
      filter.league = league;
    }

    const clubs = await Club.findAll({ where: filter });
    res.status(200).json({ clubs });
  } catch (error) {
    res.status(500).json({ msg: "Произошла ошибка при получении клубов" });
  }
}

async function deleteClub(req, res) {
  try {
    const clubId = req.params.id;
    const club = await Club.findByPk(clubId);

    if (!club) {
      return res.status(404).json({ msg: "Клуб не найден" });
    }

    if (req.user.id !== club.owner) {
      return res
        .status(403)
        .json({ msg: "Недостаточно прав для удаления клуба" });
    }

    await club.destroy();
    res.status(200).json({ msg: "Клуб успешно удален" });
  } catch (error) {
    res.status(500).json({ msg: "Произошла ошибка при удалении клуба" });
  }
}

async function editClub(req, res) {
  try {
    const clubId = req.params.id;
    const { name, city, address, phone, email, description, league } =
      req.body;
    const club = await Club.findByPk(clubId);

    if (!club) {
      return res.status(404).json({ msg: "Клуб не найден" });
    }

    if (req.user.id !== club.owner) {
      return res
        .status(403)
        .json({ msg: "Недостаточно прав для редактирования клуба" });
    }

    club.name = name;
    club.city = city;
    club.address = address;
    club.phone = phone;
    club.email = email;
    club.description = description;
    club.league = league;

    await club.save();

    res.status(200).json({ club, msg: "Клуб успешно отредактирован" });
  } catch (error) {
    res.status(500).json({ msg: "Произошла ошибка при редактировании клуба" });
  }
}

async function enterToClub(req, res) {
  try {
    const userId = req.user.id;
    const clubId = req.params.id;

    const user = await User.findByPk(userId);

    if (!user) {
      throw new Error("Пользователь не найден");
    }

    user.club = clubId;

    await user.save();

    res.status(200).json({ msg: "Пользователь успешно вступил в клуб" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Произошла ошибка при вступления в клуб" });
  }
}

async function leaveClub(req, res) {
  try {
    const userId = req.user.id;
    const clubId = req.params.id;

    const user = await User.findByPk(userId);

    if (!user) {
      throw new Error("Пользователь не найден");
    }

    if (user.club !== clubId) {
      return res
        .status(400)
        .json({ msg: "Пользователь не находится в этом клубе" });
    }

    user.club = null;

    await user.save();

    res.status(200).json({ msg: "Пользователь успешно покинул клуб" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Произошла ошибка при покидании клуба" });
  }
}

module.exports = {
  getClubs,
  getClubById,
  newClub,
  getAllClubs,
  editClub,
  deleteClub,
  enterToClub,
  leaveClub,
};
