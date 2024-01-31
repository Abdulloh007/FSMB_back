const jwt = require("jsonwebtoken");
require("dotenv").config();

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      surname: user.surname,
      patronymic: user.patronymic,
      phone: user.phone,
      email: user.email,
      photo: user.photo,
      age: user.age,
      weight: user.weight,
      height: user.height,
      head: user.head,
      helmet: user.helmet,
      armor: user.armor,
      shoes: user.shoes,
      coach: user.coach,
      city: user.city,
      gender: user.gender,
      rating: user.rating,
    },
    process.env.JWT_SECRET,
    { algorithm: "HS256", expiresIn: "90d" }
  );
}
module.exports = generateToken;
