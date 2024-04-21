const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const checkAuth = require("../utils/checkAuth");
const jwt = require("jsonwebtoken");

const { User } = require("../models/index.model");
const { UserRole } = require("../models/index.model");
const { Anthropometry } = require("../models/index.model");
const { Club } = require("../models/index.model");
const { relationship } = require("../models/relative.model");

const UserRoleEnum = [
  "admin",
  "athlet",
  "manager",
  "guest",
  "judge",
  "clubHead",
  "parent",
];

async function createUser(req, res) {
  try {
    const { name, surname, patronymic, email, phone, password } = req.body;

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

    const hashedPassword = await bcrypt.hash(password, 8);
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email: { [Op.eq]: email } }, { phone: { [Op.eq]: phone } }],
      },
    });

    if (existingUser) {
      return res.status(400).json({
        error: "Пользователь с таким email или телефоном уже существует",
      });
    }
    const newUser = await User.create({
      name,
      surname,
      patronymic,
      email,
      phone,
      password: hashedPassword,
    });

    await UserRole.create({
      userId: newUser.id,
    });

    await Anthropometry.create({
      userId: newUser.id
    });

    res.status(201).json({ message: "Пользователь успешно создан!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email }, include: [UserRole, Anthropometry] });
    if (!user) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Неверный пароль" });
    }

    const token = await generateToken(user);

    res.status(200).json({ token, message: "Успешный вход в систему" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function uploadUserPhoto(req, res) {
  const token = (req.headers.authorization || "").replace(/^Bearer\s+/i, "");
  let user = null;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      user = decoded;
    } catch (error) {
      return res.status(403).json({
        error: "Нет доступа",
      });
    }
  } else {
    return res.status(403).json({
      error: "Нет доступа",
    });
  }

  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  try {
    User.update({ photo: req.file.filename }, { where: { id: user.id } })
    res.status(200).json({ message: 'Успешно обновлен', filename: req.file.filename });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

}

async function getMe(req, res) {
  try {
    const user = req.user;

    const userData = await User.findOne({ where: { id: user.id }, include: [UserRole, Anthropometry, Club]});

    delete userData.dataValues["password"]

    let relatives = await userData.getRelative();

    relatives = relatives.map(relative => {
      return {
        id: relative.dataValues.id,
        name: relative.dataValues.name,
        surname: relative.dataValues.surname,
        relationship: relative.dataValues.relatives.relationship,
        photo: relative.dataValues.photo ? relative.dataValues.photo : 'default_avatar.png'
      }
    })

    if (userData.dataValues.photo === null) userData.dataValues.photo = 'default_avatar.png'

    res.status(200).json({...userData.dataValues, relatives});

  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

async function getAllSportsmens(req, res) {
  try {
    const user = req.user;
    const userData = await User.findAll();
    let sportsmens = []

    userData.map(sportsman => {
      // const userBlub = Club.findByPk(sportsman.club)
      if (sportsman.photo === null) sportsman.photo = 'default_avatar.png'
      sportsmens.push({
        id: sportsman.id,
        name: sportsman.name,
        surname: sportsman.surname,
        patronymic: sportsman.patronymic,
        city: sportsman.city,
        age: sportsman.age,
        club: sportsman.club,
        rate: sportsman.rating,
        photo: sportsman.photo
      })
    })


    res.status(200).json({ sportsmens });

  } catch (error) {
    res.status(409).json({ error: error })
  }
}

async function getById(req, res) {
  try {
    const userId = req.params.id;
    const userData = await User.findOne({ where: { id: userId } });


    res.status(200).json({
      name: userData.name,
      surname: userData.surname,
    });

  } catch (error) { 
    res.status(409).json({ error: error })
  }
}

async function deleteProfile(req, res) {
  try {
    const user = req.user;

    await User.destroy({ where: { id: user.id } });

    res.status(200).json({ message: "Профиль успешно удален" });
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
}

async function editProfile(req, res) {
  try {
    const user = req.user;
    const { name, surname, patronymic, city, gender, address, phone, email, birth, photo } = req.body;

    const age = (new Date() - new Date(birth)) / 1000 / 60 / 60 / 24 / 365;

    await User.update(
      {
        photo,
        age,
        name,
        surname,
        patronymic,
        age,
        city,
        gender,
        address,
        phone,
        email,
        birth
      },
      { where: { id: user.id }, include: [UserRole, Anthropometry, Club] }
    );

    user.name = name;
    user.surname = surname;
    user.patronymic = patronymic;
    user.age = age;
    user.city = city;
    user.gender = gender;
    user.address = address;
    user.phone = phone;
    user.email = email;
    user.birth = birth;

    const token = await generateToken(user);
    res.status(200).json({ token, msg: "Профиль успешно обновлен" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function changeUserRole(req, res) {
  try {
    const { userId, role, action } = req.body;
    if (!req.user || !req.user.roles.includes("admin")) {
      return res.status(403).json({
        error: "Только администратор может изменять роли пользователей",
      });
    }

    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }

    if (!UserRoleEnum.includes(role)) {
      return res.status(400).json({ error: "Указана некорректная роль" });
    }

    let existingRole = await UserRole.findOne({
      where: {
        userId: userId,
        roles: role,
      },
    });

    if (action === "add") {
      if (existingRole) {
        return res
          .status(400)
          .json({ error: "У пользователя уже есть эта роль" });
      }

      const newUserRole = await UserRole.create({
        userId: userId,
        roles: role,
      });

      return res
        .status(200)
        .json({ message: "Роль успешно добавлена пользователю" });
    } else if (action === "remove") {
      if (!existingRole) {
        return res.status(400).json({ error: "У пользователя нет этой роли" });
      }

      await existingRole.destroy();

      return res
        .status(200)
        .json({ message: "Роль успешно удалена у пользователя" });
    } else {
      return res.status(400).json({ error: "Некорректное действие" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function searchUser(req, res) {
  try {
    const user = req.user;
    const userData = await User.findAll({ where: { name: req.params.name } });
    delete userData.dataValues["password"]

    if (userData.dataValues.photo === null) userData.dataValues.photo = 'default_avatar.png'

    res.status(200).json({ ...userData.dataValues });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function removeAvatar(req, res) {
  try {
    const user = req.user

    await User.update(
      {
        photo: null
      },
      { where: { id: user.id } 
    });

    res.status(200).json({ filename: 'default_avatar.png' });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function addRelative(req, res) {
  try {
    const user = await User.findByPk(req.user.id);

    const relative = await user.addRelative(req.body.relative, {through: {relationship: req.body.relationship}});

    res.status(200).json(relative);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


module.exports = {
  createUser,
  loginUser,
  uploadUserPhoto,
  getMe,
  getById,
  deleteProfile,
  editProfile,
  changeUserRole,
  searchUser,
  getAllSportsmens,
  removeAvatar,
  addRelative
};
