//importando bibliotecas
const router = require("express").Router();

//importando arquivos
const TabelaFornecedor = require("../../controllers/TabelaFornecedor");
const Fornecedor = require("../../models/Fornecedor");
const SerelizadorFornecedor =
  require("../../Serializador").SerializadorFornecedor;

//Rota para Listar GET
router.get("/", async (req, res) => {
  const listarTodos = await TabelaFornecedor.listar();
  const serealizador = new SerelizadorFornecedor(res.getHeader("Content-Type"));

  res.status(200).send(serealizador.serializar(listarTodos));
});

//Rota para Cadastras POST
router.post("/", async (req, res, proxi) => {
  try {
    const dadosRecebidos = req.body;
    const fornecedor = new Fornecedor(dadosRecebidos);
    await fornecedor.criar();
    const serealizador = new SerelizadorFornecedor(res.getHeader("Content-Type"));
    res.status(201).send(serealizador.serializar(fornecedor));
  } catch (error) {
    proxi(error);
  }
});

//Rota para Listar por ID GET
router.get("/:idFornecedor", async (req, res, proxy) => {
  try {
    const id = req.params.idFornecedor;
    const fornecedor = new Fornecedor({ id: id });
    await fornecedor.carregar();
    const serealizador = new SerelizadorFornecedor(
      res.getHeader("Content-Type"),
      ["email", "dataCriacao", "dataAtualizacao", "versao"]
    );
    res.status(200).send(serealizador.serializar(fornecedor));
  } catch (error) {
    proxy(error);
  }
});

//Rota para Alterar UPDATE
router.put("/:idFornecedor", async (req, res, proxi) => {
  try {
    const id = req.params.idFornecedor;
    const dadosRecebidos = req.body;
    const dados = Object.assign({}, dadosRecebidos, { id: id });
    const fornecedor = new Fornecedor(dados);
    await fornecedor.carregar();
    await fornecedor.atualizar();
    const serealizador = new SerelizadorFornecedor(
      res.getHeader("Content-Type")
    );
    res.status(200).send(serealizador.serializar(fornecedor));
  } catch (error) {
    proxi(error);
  }
});

//Rota para Deletar DELETE
router.delete("/:idFornecedor", async (req, res, proxi) => {
  try {
    const id = req.params.idFornecedor;
    const fornecedor = new Fornecedor({ id: id });
    await fornecedor.carregar();
    await fornecedor.remover();
    const serealizador = new SerelizadorFornecedor(
      res.getHeader("Content-Type")
    );
    res.status(200).send(serealizador(fornecedor));
  } catch (error) {
    proxi(error);
  }
});

//exportando modulo
module.exports = router;
