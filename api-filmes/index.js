//importando bibliotecas
const express = require("express");
const bodyParser = require("body-parser");

//instanciando objeto
const app = express();
app.use(bodyParser.json());

//Rota GET
app.get("/api/filmes", (req, res) => {
  const filmes = [
    { nome: "Os Vingadores3" },
    { nome: "Destacamento blood" },
    { nome: "Pantera negra" },
  ];
  res.send(JSON.stringify(filmes));
});

//levantando servidor
app.listen(3000, () => console.log("API já está funcionando"));
