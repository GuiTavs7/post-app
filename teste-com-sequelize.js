// 1) Criando tabelas no banco de dados a partir do node.js com Sequelize

const Sequelize = require('sequelize');

// 2) Conexão com o banco de dados - 4 parâmetros: nome do banco, usuário, senha e objeto de configuração

const sequelize = new Sequelize("sistemaDeCadastro", "root", "27012024", {
    host: "localhost", // host = onde está rodando SQL | localhost = próprio computador
    dialect: "mysql" // dialect = tipo do banco de dados
});

// 3) Função para testar a conexão com o banco de dados

sequelize.authenticate().then(function() {
    console.log("Conexão com o banco de dados realizada com sucesso!");
}).catch(function(erro) {
    console.log("Falha ao se conectar com o banco de dados: " + erro);
});

// 4 Criando um Model - referência para a tabela do banco de dados

const Postagem = sequelize.define("postagens", {
    titulo: {
        type: Sequelize.STRING
    },      
    conteudo:{
        type: Sequelize.TEXT //Ilimitado de caracteres
    }
});

// Postagem.sync({force: true}); // força a criação da tabela no banco de dados

// 5) Criando um Model - referência para a tabela do banco de dados

const Usuario = sequelize.define("usuarios", {
    nome: {
        type: Sequelize.STRING
    },
    sobreNome: {
        type: Sequelize.STRING
    },
    idade:{
        type: Sequelize.INTEGER
    },
    email:{
        type: Sequelize.STRING
    }
});

// Usuario.sync({force: true}); // força a criação da tabela no banco de dados

// 6) Inserindo dados na tabela do banco de dados

Postagem.create({
    titulo: "Um título qualquer",
    conteudo: "Um conteúdo qualquer"
});

Usuario.create({
    nome: "Ana",
    sobreNome: "Timóteo",
    idade: 20,
    email: "ana.timoteo@example.com"
});

// 7) Após criar o model, podemos utilizar os métodos do Sequelize para manipular os dados no banco de dados, como criar, ler, atualizar e deletar registros.

// OBS: É importante comentar a linha de criação da tabela (sync) após a primeira execução, para evitar recriar a tabela e perder os dados inseridos.

// Se usar nodemon, comente também a linha de inserção de dados (create) após a primeira execução, para evitar inserir os mesmos dados novamente.