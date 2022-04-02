//importando bibliotecas
const Sequelize = require("sequelize");
const config = require("config");

//instancia Sequelize
const instancia = new Sequelize(
  config.get("mysql.banco-de-dados"),
  config.get("mysql.usuario"),
  config.get("mysql.senha"),

  {
    host: config.get("mysql.host"),
    dialect: "mysql",
  }
);

//exportando instancia
module.exports = instancia;
