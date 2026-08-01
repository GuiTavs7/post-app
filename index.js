const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const Post = require('./models/Post.js'); // importando o modelo Post para ser usado no backend
const multer = require('multer');
const path = require('path');

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

    app.use(express.static(path.join(__dirname, 'public'))); // define a pasta public como estática para servir arquivos estáticos

    console.log(path.join(__dirname, "public"));

    // Multer

    const {CloudinaryStorage} = require("multer-storage-cloudinary");
    const cloudinary = require("./config/cloudinary");
    const storage = new CloudinaryStorage({
      cloudinary: cloudinary,
      folder: 'post-app',
      allowedFormats: ['jpg', 'png', 'gif']
    });
  
    const upload = multer({ storage: storage });

  // Rotas
    app.get('/', (req, res) => {
      try{
        const posts = Post.findAll({
          order: [['createdAt', 'DESC']]
        });

        const postsFormatados = posts.map(post => ({
          ...post.toJSON(),
          dataFormatada: new Intl.DateTimeFormat('pt-BR', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'America/Sao_Paulo'
          }).format(post.createdAt)
        }));

        res.render('home.handlebars', { posts: postsFormatados });
      
      } catch (erro) {
        res.send('Houve um erro: ' + erro);
      }
    });

    app.get('/cad', (req, res) => {
      //res.send('Rota de cadastro');
      res.render('formulario.handlebars');
    });

    app.post('/add', upload.single('imagem'), async (req, res) => {
      try {
        await Post.create({
          titulo: req.body.titulo,
          conteudo: req.body.conteudo,
          imagem: req.file.path // Salva o caminho da imagem no banco de dados
        });
        res.redirect('/');
      } catch (erro) {
        res.send('Houve um erro: ' + erro);
      }
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