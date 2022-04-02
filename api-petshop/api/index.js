//importando bibliotecas
const express = require("express");
const bodyParser = require("body-parser");
const config = require("config");
//importando arquivos
const router = require("./routers/fornecedores/index");
const NaoEncontrado = require("./erros/NaoEncontrado");
const CampoInvalido = require("./erros/CampoInvalido");
const DadosnaoFornecido = require("./erros/DadosNaoFornecidos");
const ValorNaoSuportado = require("./erros/ValorNaoSuportado");
const formatosAceitos = require("./Serializador").formatosAceitos;
const SerializadorErro = require("./Serializador").SerializadorErro;

//instancia de bibliotecas
const app = express();
app.use(bodyParser.json());

//formato
app.use((req, res, proxi) => {
  let formatoRequisitado = req.header("Accept");
  if (formatoRequisitado === "*/*") {
    formatoRequisitado = "application/json";
  }

  if (formatosAceitos.indexOf(formatoRequisitado) === -1) {
    res.status(406);
    res.end();
    return;
  }
  res.setHeader("Content-Type", formatoRequisitado);
  proxi();
});

//instancia de arquivos
app.use("/api/fornecedores", router);

//Midleware tratando erros
app.use((error, req, res, proxi) => {
  let status = 500;
  if (error instanceof NaoEncontrado) {
    status = 404;
  }
  if (error instanceof CampoInvalido || error instanceof DadosnaoFornecido) {
    status = 400;
  }
  if (error instanceof ValorNaoSuportado) {
    status = 406;
  }
  const serializador = new SerializadorErro(res.getHeader("Content-Type"));
  res
    .status(status)
    .send(
      serializador.serializar({ mensagem: error.message, id: error.idErro })
    );
});

app.listen(config.get("api.porta"), () =>
  console.log("A API está funcionando!")
);
