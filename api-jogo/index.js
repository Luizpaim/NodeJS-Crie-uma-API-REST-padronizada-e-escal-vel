// importando bibliotecas
const express = require("express");
const bodyParser = require("body-parser");

//instanciando objetos
const app = express();
app.use(bodyParser.json());

//criando objetos jogos
const jogosFavoritos = [];

//Rota para cadastrar
app.post("/api/jogos", (req, res) => {
  try {
    if (!req.body.nome || !req.body.plataforma) {
      throw new Error("Campos inválidos");
    }
    jogosFavoritos.push(req.body);
    res.send(JSON.stringify(req.body));
  } catch (error) {
    res.send(JSON.stringify({ mensagem: error.message }));
  }
});

//Rota para Listar
app.get("/api/jogos", (req, res) => {
  res.send(JSON.stringify(jogosFavoritos));
});

//levantando servidor
app.listen(3000, () => console.log("API está funcionando"));
