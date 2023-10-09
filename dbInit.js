const Sequelize = require("sequelize");

const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  storage: "database.sqlite",
});

const Contribution = require("./models/Contribution.js")(
  sequelize,
  Sequelize.DataTypes
);

sequelize.sync();

module.exports = { Contribution };