const Sequelize = require("sequelize");
const conf = require("./config/conf");

const sequelize = new Sequelize(
  conf.database.database,
  conf.database.username,
  conf.database.password,
  {
    host: conf.database.host,
    dialect: "mysql",
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = {sequelize};
