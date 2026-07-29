const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const Post = require('./models/Post.js'); // importando o modelo Post para ser usado no backend

// Config

  // Template Engine
    app.engine('handlebars', handlebars.engine({ defaultLayout: 'main', 
      runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
      }
    })); // main = layout padrão
    app.set('view engine', 'handlebars');

  // Body Parser
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    
  // Rotas

    app.get('/', (req, res) => {
      Post.findAll({order: [['createdAt', 'DESC']]}).then((posts) => {
        console.log(posts);
        res.render('home.handlebars', { posts: posts });
      })
    });

    app.get('/cad', (req, res) => {
      //res.send('Rota de cadastro');
      res.render('formulario.handlebars');
    });

    app.post('/add', (req, res) => {
      Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
      }).then(() => {
        res.redirect('/'); // redireciona para a página inicial após criar a postagem
      }).catch((erro) => {
        res.send('Houve um erro: ' + erro);
      });
    });

    app.get('/deletar/:id', (req, res) => {
      Post.destroy({where: {'id': req.params.id}}).then(() => {
        res.redirect('/');
      }).catch((erro) => {
        res.send('Esta postagem não existe!');
      });
    });

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});