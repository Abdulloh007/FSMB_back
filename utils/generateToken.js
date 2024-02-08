const jwt = require("jsonwebtoken");
const UserRole = require("../models/role.model");
const Anthropometry = require("../models/anthropometry.model");
require("dotenv").config();
async function generateToken(user) {
  try {
    const userRoles = await UserRole.findAll({
      where: { userId: user.id },
    });

    if (!userRoles || userRoles.length === 0) {
      throw new Error("User roles not found");
    }
    const roles = userRoles.map((userRole) => userRole.roles);
    const anthropometryData = await Anthropometry.findOne({
      where: { userId: user.id },
    });

    if (!anthropometryData) {
      throw new Error("Anthropometry data not found for the user");
    }

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
        roles: roles.flat(),
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
