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

sequelize
  .sync()
  .then(() => {
    console.log("All tables and models synced!!");
  })
  .catch((err) => {
    console.log("Error syncing tables and models!!");
  });
module.exports = { sequelize };
