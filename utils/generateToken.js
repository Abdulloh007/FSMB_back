const jwt = require("jsonwebtoken");
const UserRole = require("../models/role.model");
const Anthropometry = require("../models/anthropometry.model");
require("dotenv").config();

async function generateToken(user) {
  try {
    // const roles = user.user_roles.map((userRole) => userRole.roles);
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
        anthropometry: user.anthropometry,
        coach: user.coach,
        city: user.city,
        gender: user.gender,
        rating: user.rating
        // roles: roles.flat()
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
