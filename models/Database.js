require('dotenv').config(); // Configura as variáveis de ambiente;

const Sequelize = require('sequelize');

  // Conexão com o banco de dados MySQL
    const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: "mysql"
    });

    sequelize.authenticate().then(() => {
      console.log('Conexão com o banco de dados MySQL realizada com sucesso!');
    }).catch((erro) => {
      console.log('Não foi possível conectar com o banco de dados MySQL: ' + erro);
    });

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize
}