// importando arquivos
const ModeloTabela = require("../models/ModeloTabelaFornecedor");

ModeloTabela.sync()
  .then(() => console.log("Tabela criada com sucesso"))
  .catch(console.log("error"));
