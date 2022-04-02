import { Instancia } from "../models/ModeloTabelaFornecedor";

Instancia.sync()
  .then(() => console.log("tabela criada com sucesso"))
  .catch(() => console.log("error"));
