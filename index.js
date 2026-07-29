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

    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'public/uploads/'); // define o diretório de destino para os arquivos enviados
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // define o nome do arquivo enviado
      }
    });
    const upload = multer({ storage: storage });

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

    app.post('/add', upload.single('imagem'), (req, res) => {
      Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo,
        imagem: req.file ? req.file.filename : null // verifica se um arquivo foi enviado e salva o nome do arquivo, caso contrário, salva null
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