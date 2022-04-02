const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.listen(3001, () => console.log("API Funcionando"));

const sitesAcessados = [];
app.post("api/sites", (req, res) => {
  if (!req.body.url || !req.body.dataDeAcesso) {
    res
      .status(400)
      .send(JSON.stringify({ mensagem: "Os campos são inválidos" }))
      .end();
    return;
  }
  const site = {
    url: req.body.url,
    dataDeAcesso: req.body.dataDeAcesso,
  };
  sitesAcessados.push(site);
  res.status(201).send(JSON.stringify(site));
});
