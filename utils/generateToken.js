const jwt = require("jsonwebtoken");
const UserRole = require("../models/role.model");
const Anthropometry = require("../models/anthropometry.model");
require("dotenv").config();

async function generateToken(user) {
  try {
    const userWithRoles = await UserRole.findOne({
      where: { userId: user.id },
    });

    if (!userWithRoles) {
      throw new Error("User roles not found");
    }

    const roles = userWithRoles.roles;
    const anthropometryData = await Anthropometry.findOne({
      where: { userId: user.id },
    });


    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        surname: user.surname,
        patronymic: user.patronymic,
        phone: user.phone,
        email: user.email,
        photo: user.photo,
        age: user.age,
        weight: anthropometryData.weight,
        height: anthropometryData.height,
        head: anthropometryData.head,
        helmet: anthropometryData.helmet,
        armor: anthropometryData.armor,
        shoes: anthropometryData.shoes,
        coach: user.coach,
        city: user.city,
        gender: user.gender,
        rating: user.rating,
        roles: roles,
      },
      process.env.JWT_SECRET,
      { algorithm: "HS256", expiresIn: "90d" }
    );

    return token;
  } catch (error) {
    throw new Error("Error generating token: " + error.message);
  }
}

module.exports = generateToken;
