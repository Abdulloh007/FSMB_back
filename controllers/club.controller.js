const { Op } = require("sequelize");
const { Club, Nominations, ClubMembers } = require("../models/index.model");
const { User } = require("../models/index.model");
const { League } = require("../models/index.model");

async function getClubs(req, res) {
  try {
    const clubs = await Club.findAll({ include: [League, Nominations, 'owner'] });

    res.status(200).json({ clubs });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getClubById(req, res) {
  try {
    const clubId = req.params.id;
    const club = await Club.findOne({
      where: {
        id: clubId,
      },
      include: ["owner"]
    });

    const users = await club.getUsers()
    const clubMembers = await club.getClubsMembers()

    let sportsmans = clubMembers.map((item) => {
      let clUser = users.find((it) => it.id === item.userId)
      return {
        id: clUser.id,
        full_name: `${clUser.surname} ${clUser.name} ${clUser.patronymic}`,
        birth: clUser.birth,
        status: item.status,
        role: item.role
      }
    })

    res.status(200).json({ club, members: sportsmans });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getMyClub(req, res) {
  try {
    const userId = req.user.id;
    const user = await User.findByPk(userId)

    const club = await Club.findOne({
      where: {
        id: user.clubId,
      },
      include: ["owner"]
    });

    const users = await club.getUsers()
    const clubMembers = await club.getClubsMembers()

    let sportsmans = clubMembers.map((item) => {
      let clUser = users.find((it) => it.id === item.userId)
      return {
        id: clUser.id,
        full_name: `${clUser.surname} ${clUser.name} ${clUser.patronymic}`,
        birth: clUser.birth,
        status: item.status === 'pending' ? 'Заявка' : item.status === 'approved' ? 'Утвержден' : item.status === 'rejected' ? 'Откланён' : '',
        role: 
        item.role === 'leader'   ? 'Глава' 
        : item.role === 'casher'   ? 'Козначей' 
        : item.role === 'couch'   ? 'Тренер' 
        : item.role === 'secretary'   ? 'Секретарь' 
        : item.role === 'sportsman'   ? 'Спортсмен' : "" 
        
      }
    })

    res.status(200).json({ club, members: sportsmans });
  } catch (error) {
    res.status(400).json({ error: error.message });
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
        .json({ error: "Некорректный формат электронной почты" });
    }

    if (!isNaN(phone) && phone.lenght > 8 && phone.lenght < 12) {
      return res
        .status(400)
        .json({ error: "Некорректный формат номера телефона" });
    }

    const newClub = await Club.create({
      name,
      city,
      address,
      description,
      phone,
      email,
      ownerId: user.id,
      // userId: user.id,
    });

    res.status(200).json({ club: newClub, msg: "Клуб успешно создан" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getAllClubs(req, res) {
  try {
    const { city, name, membersAge } = req.query;
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

    const clubs = await Club.findAll({ where: filter });
    res.status(200).json({ clubs });
  } catch (error) {
    res.status(409).json({ error: "Произошла ошибка при получении клубов" });
  }
}

async function deleteClub(req, res) {
  try {
    const clubId = req.params.id;
    const club = await Club.findByPk(clubId);

    if (!club) {
      return res.status(404).json({ error: "Клуб не найден" });
    }

    if (req.user.id !== club.owner) {
      return res
        .status(403)
        .json({ error: "Недостаточно прав для удаления клуба" });
    }

    await club.destroy();
    res.status(200).json({ message: "Клуб успешно удален" });
  } catch (error) {
    res.status(409).json({ error: "Произошла ошибка при удалении клуба" });
  }
}

async function editClub(req, res) {
  try {
    const clubId = req.params.id;
    const { name, city, address, phone, email, description } =
      req.body;
    const club = await Club.findByPk(clubId);

    if (!club) {
      return res.status(404).json({ error: "Клуб не найден" });
    }

    if (req.user.id !== club.ownerId) {
      return res
        .status(403)
        .json({ error: "Недостаточно прав для редактирования клуба" });
    }

    club.name = name;
    club.city = city;
    club.address = address;
    club.phone = phone;
    club.email = email;
    club.description = description;

    await club.save();

    res.status(200).json({ club, message: "Клуб успешно отредактирован" });
  } catch (error) {
    res.status(409).json({ error: "Произошла ошибка при редактировании клуба" });
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

    user.clubId = clubId;

    await user.save();

    await ClubMembers.create({
      role: "sportsman",
      clubId: clubId,
      userId: userId
    })

    res.status(200).json({ message: "Пользователь успешно вступил в клуб" });
  } catch (error) {
    console.log(error);
    res.status(409).json({ error: "Произошла ошибка при вступления в клуб" });
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
        .json({ error: "Пользователь не находится в этом клубе" });
    }

    user.club = null;

    await user.save();

    res.status(200).json({ message: "Пользователь успешно покинул клуб" });
  } catch (error) {
    console.log(error);
    res.status(409).json({ error: "Произошла ошибка при покидании клуба" });
  }
}

async function setNomination(req, res) {
  try {
    const user = req.user;

    const clubId = req.params.id;
    const { nominationId } = req.body;

    const club = await Club.findByPk(clubId)

    if (!club) {
      return res.status(404).json({ error: "Клуб не найден" });
    }

    if (req.user.id !== club.ownerId) {
      return res
        .status(403)
        .json({ error: "Недостаточно прав для редактирования клуба" });
    }

    await club.addNomination(nominationId)

    res.status(200).json(club);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function setLeague(req, res) {
  try {
    const user = req.user;

    const clubId = req.params.id;
    const { leagueId } = req.body;

    const club = await Club.findByPk(clubId)

    if (!club) {
      return res.status(404).json({ error: "Клуб не найден" });
    }

    if (req.user.id !== club.ownerId) {
      return res
        .status(403)
        .json({ error: "Недостаточно прав для редактирования клуба" });
    }

    await club.addLeague(leagueId)

    res.status(200).json(club);
  } catch (error) {
    res.status(400).json({ error: error.message });
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
  setNomination,
  setLeague,
  getMyClub
};
