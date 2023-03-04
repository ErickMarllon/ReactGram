require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");

const port = process.env.PORT;

const app = express();

// config JSON and form data response -- configurando JSON e formulário de resposta de dados

// para habilitar express json
app.use(express.json());

// para aceitar form data
app.use(express.urlencoded({ extended: false }));

//Solve CORS --- resolvendo cors  quando executa requisições em um mesmo dominio
// origin é o site que o projeto vai ficar  se mudar o app para de funcionar
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// upload directory --- diretorio de upload de imagens
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// DB Connectio -- conexao ao banco de dados
require("./config/db.js");

// Sitema de rotas
const router = require("./routes/Router.js");
app.use(router);

// iniciando a aplicação
app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});
