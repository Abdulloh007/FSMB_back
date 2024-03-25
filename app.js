const express = require("express");
const conf = require("./config/conf");
const cors = require('cors');
const routes = require("./routes/index");

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
