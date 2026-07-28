const database = require('./Database.js'); // importando o arquivo db.js para conectar com o banco de dados

const Post = database.sequelize.define('postagens', { // define = define a tabela no banco de dados
  titulo: {
    type: database.Sequelize.STRING // STRING = tipo de dado do campo
  },
  conteudo: {
    type: database.Sequelize.TEXT // TEXT = tipo de dado do campo
  }
});

module.exports = Post; // exportando o modelo Post para ser usado em outros arquivos

// Post.sync({ force: true }); 
 
// sync = sincroniza o modelo com o banco de dados | force = força a criação da tabela, mesmo que ela já exista