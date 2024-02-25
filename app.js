const express = require("express");
const conf = require("./config/conf");
const cors = require('cors')
const { sequelize } = require("./sequelize.db");
const routes = require("./routes/index");
const Club = require("./models/club.model");
const Tournament = require("./models/tournament.model");
const Application = require("./models/application.model");
const port = conf.server.port || 3000;
const host = conf.server.host || "localhost";
const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", routes);

app.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
