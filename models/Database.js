const Sequelize = require('sequelize');

  // Conexão com o banco de dados MySQL
    const sequelize = new Sequelize("postApp", "root", "27012024", {
      host: "localhost", // host = onde está rodando SQL | localhost = próprio computador
      dialect: "mysql" // dialect = tipo do banco de dados
    });

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize
}