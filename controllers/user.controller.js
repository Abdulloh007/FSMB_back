const { Op } = require("sequelize");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const UserRole = require("../models/role.model");
const Anthropometry = require("../models/anthropometry.model");
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
        .json({ msg: "Некорректный формат электронной почты" });
    }

    const phoneRegex = /^\+992\d{9}$/;
    if (!phoneRegex.test(phone)) {
      return res
        .status(400)
        .json({ msg: "Некорректный формат номера телефона" });
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email: { [Op.eq]: email } }, { phone: { [Op.eq]: phone } }],
      },
    });

    if (existingUser) {
      return res.status(400).json({
        msg: "Пользователь с таким email или телефоном уже существует",
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
    const userRole = await UserRole.create({
      userId: newUser.id,
    });
    // const newAnthropometry = await Anthropometry.create({
    //   userId: newUser.id,
    // });
    res.status(201).json({ msg: "Пользователь успешно создан!" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
}
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ msg: "Пользователь не найден" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ msg: "Неверный пароль" });
    }
    const token = await generateToken(user);

    res.status(200).json({ token, msg: "Успешный вход в систему" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
}
async function getMe(req, res) {
  try {
    const user = req.user;

    const userData = await User.findOne({ where: { id: user.id } });

    res.status(200).json({ user: userData });
  } catch (error) {}
}
async function deleteProfile(req, res) {
  try {
    const user = req.user;

    await User.destroy({ where: { id: user.id } });

    res.status(200).json({ msg: "Профиль успешно удален" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
}
async function editProfile(req, res) {
  try {
    const user = req.user;
    const { name, surname, patronymic, age, city, gender } = req.body;

    await User.update(
      {
        name,
        surname,
        patronymic,
        age,
        city,
        gender,
      },
      { where: { id: user.id } }
    );

    user.name = name;
    user.surname = surname;
    user.patronymic = patronymic;
    user.age = age;
    user.city = city;
    user.gender = gender;

    const token = await generateToken(user);
    res.status(200).json({ token, msg: "Профиль успешно обновлен" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
}
async function changeUserRole(req, res) {
  try {
    const { userId, role, action } = req.body;
    if (!req.user || !req.user.roles.includes("admin")) {
      return res.status(403).json({
        msg: "Только администратор может изменять роли пользователей",
      });
    }

    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ msg: "Пользователь не найден" });
    }

    if (!UserRoleEnum.includes(role)) {
      return res.status(400).json({ msg: "Указана некорректная роль" });
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
          .json({ msg: "У пользователя уже есть эта роль" });
      }

      const newUserRole = await UserRole.create({
        userId: userId,
        roles: role,
      });

      return res
        .status(200)
        .json({ msg: "Роль успешно добавлена пользователю" });
    } else if (action === "remove") {
      if (!existingRole) {
        return res.status(400).json({ msg: "У пользователя нет этой роли" });
      }

      await existingRole.destroy();

      return res
        .status(200)
        .json({ msg: "Роль успешно удалена у пользователя" });
    } else {
      return res.status(400).json({ msg: "Некорректное действие" });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
}

module.exports = {
  createUser,
  loginUser,
  getMe,
  deleteProfile,
  editProfile,
  changeUserRole,
};
